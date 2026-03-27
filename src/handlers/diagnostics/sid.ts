import type { Diagnostic } from 'vscode-languageclient';
import type { StatementEntry } from '../../lib/treesitter/base.ts';
import { ElementValidator } from './base.ts';
import { createDiagnostic } from './utils.ts';

export class SidValidator extends ElementValidator {
  #sids: Record<string, StatementEntry> = {};
  constructor() {
    super();
    this.#sids = {};
  }

  validate(entry: StatementEntry): Array<Diagnostic> {
    const diagnostics: Array<Diagnostic> = super.validate(entry);
    const sidValue = entry.values[0]?.text;
    if (!sidValue) return [];
    if (sidValue in this.#sids) {
      diagnostics.push(createDiagnostic(`Duplicate statement id value "${sidValue}"`, entry.valueRange));
      diagnostics.push(createDiagnostic(`Duplicate statement id value "${sidValue}"`, this.#sids[sidValue].valueRange));
    }
    this.#sids[sidValue] = entry;
    return diagnostics;
  }
}
