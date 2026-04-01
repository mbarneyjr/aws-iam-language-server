import type { Diagnostic } from 'vscode-languageclient';
import { partitions } from '../../lib/iam-policy/partitions.ts';
import type { StatementEntry, StatementValue } from '../../lib/treesitter/base.ts';
import { ElementValidator } from './base.ts';
import { createDiagnostic } from './utils.ts';

const validPartitions = new Set(Object.keys(partitions));
const validRegions: Set<string> = new Set(Object.values(partitions).flatMap((p) => p.regions.map((r) => r.id)));
const accountIdPattern = /^\d{12}$/;

function validateArn(value: StatementValue): Array<Diagnostic> {
  const text = value.text;
  const diagnostics: Array<Diagnostic> = [];

  if (!text.startsWith('arn:')) return [];

  const segments = text.split(':');
  if (segments.length > 1) {
    const partition = segments[1];
    if (partition === '') {
      diagnostics.push(createDiagnostic('partition is required', value.range));
    } else if (partition !== '*' && !validPartitions.has(partition)) {
      diagnostics.push(createDiagnostic(`partition must be one of: ${[...validPartitions].join(',')}`, value.range));
    }
  }

  if (segments.length > 3) {
    const region = segments[3];
    if (region !== '*' && region !== '' && !validRegions.has(region)) {
      diagnostics.push(createDiagnostic('invalid region', value.range));
    }
  }

  if (segments.length > 4) {
    const account = segments[4];
    if (account !== '*' && account !== '' && !accountIdPattern.test(account)) {
      diagnostics.push(createDiagnostic('expected account id to be 12 digits', value.range));
    }
  }

  return diagnostics;
}

export class ResourceValidator extends ElementValidator {
  validate(entry: StatementEntry): Array<Diagnostic> {
    let diagnostics: Array<Diagnostic> = super.validate(entry);

    for (const value of entry.values) {
      diagnostics = diagnostics.concat(validateArn(value));
    }

    return diagnostics;
  }
}
