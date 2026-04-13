import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import type { Connection, Diagnostic } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { loadDiagnosticTests } from '../../test-utils/test-cases/diagnostics/index.ts';
import { resetConfig, updateConfig } from '../lib/config.ts';
import { TreeManager } from '../lib/treesitter/manager.ts';
import { diagnosticsHandler } from './diagnostics/diagnostics.ts';

const categories = ['actions', 'resource'];

describe('diagnosticsHandler', async () => {
  let treeManager: TreeManager;

  function createMockConnection() {
    let captured: Diagnostic[] = [];
    const connection = {
      console: {
        log: () => {},
        debug: () => {},
        info: () => {},
        warn: () => {},
        error: () => {},
      },
      sendDiagnostics: (params: { diagnostics: Diagnostic[] }) => {
        captured = params.diagnostics;
      },
    } as unknown as Connection;
    return { connection, getDiagnostics: () => captured };
  }

  before(async () => {
    const { connection } = createMockConnection();
    treeManager = new TreeManager(connection);
  });

  for (const category of categories) {
    describe(category, async () => {
      const tests = loadDiagnosticTests(category);
      for (const testCase of tests) {
        it(`${testCase.category}/${testCase.filename}`, async () => {
          if (testCase.config) updateConfig(testCase.config);
          try {
            const uri = `test://${testCase.category}/${testCase.filename}`;
            await treeManager.openDocument(uri, testCase.doc, testCase.lang);
            const { connection, getDiagnostics } = createMockConnection();
            const document = TextDocument.create(uri, testCase.lang, 1, testCase.doc);
            await diagnosticsHandler(document, treeManager, connection);

            let diagnostics = getDiagnostics();
            if (testCase.code) {
              diagnostics = diagnostics.filter((d) => d.code === testCase.code);
            }

            if (testCase.count !== undefined) {
              assert.equal(
                diagnostics.length,
                testCase.count,
                `expected ${testCase.count} diagnostics, got ${diagnostics.length}`,
              );
            }
            if (testCase.includes) {
              const messages = diagnostics.map((d) => d.message);
              for (const substring of testCase.includes) {
                assert.ok(
                  messages.some((m) => m.includes(substring)),
                  `expected a diagnostic containing "${substring}", got: ${JSON.stringify(messages)}`,
                );
              }
            }
            if (testCase.excludes) {
              const messages = diagnostics.map((d) => d.message);
              for (const substring of testCase.excludes) {
                assert.ok(
                  !messages.some((m) => m.includes(substring)),
                  `did not expect a diagnostic containing "${substring}"`,
                );
              }
            }
            if (testCase.range) {
              assert.ok(diagnostics.length > 0, 'expected at least one diagnostic for range assertion');
              assert.deepEqual(diagnostics[0].range, testCase.range, 'diagnostic range mismatch');
            }
          } finally {
            if (testCase.config) resetConfig();
          }
        });
      }
    });
  }
});
