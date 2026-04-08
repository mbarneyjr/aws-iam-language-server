import type { Diagnostic } from 'vscode-languageclient';
import { isRuleEnabled } from '../../lib/config.ts';
import type { StatementEntry } from '../../lib/treesitter/base.ts';
import { createDiagnostic } from './utils.ts';

export class ElementValidator {
  #validated: boolean;
  constructor() {
    this.#validated = false;
  }
  validate(entry: StatementEntry): Array<Diagnostic> {
    const diagnostics: Array<Diagnostic> = [];
    if (this.#validated && isRuleEnabled('DUPLICATE_KEY')) {
      diagnostics.push(createDiagnostic('DUPLICATE_KEY', 'duplicate statement key', entry.keyRange));
    }
    this.#validated = true;
    return diagnostics;
  }
  isValidated(): boolean {
    return this.#validated;
  }
  resetForStatement() {
    this.#validated = false;
  }
}
