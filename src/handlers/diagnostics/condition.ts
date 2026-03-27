import type { Diagnostic } from 'vscode-languageclient';
import type { StatementEntry } from '../../lib/treesitter/base.ts';
import { ElementValidator } from './base.ts';

export class ConditionValidator extends ElementValidator {
  validate(entry: StatementEntry): Array<Diagnostic> {
    const diagnostics: Array<Diagnostic> = super.validate(entry);
    return diagnostics;
  }
}
