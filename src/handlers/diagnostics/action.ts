import type { Diagnostic } from 'vscode-languageclient';
import { expandActionPattern } from '../../lib/iam-policy/wildcard.ts';
import type { StatementEntry } from '../../lib/treesitter/base.ts';
import { ElementValidator } from './base.ts';
import { createDiagnostic } from './utils.ts';

export class ActionValidator extends ElementValidator {
  validate(entry: StatementEntry): Array<Diagnostic> {
    const diagnostics: Array<Diagnostic> = super.validate(entry);
    for (const value of entry.values) {
      if (expandActionPattern(value.text).length === 0) {
        diagnostics.push(createDiagnostic(`Unrecognized action "${value.text}"`, value.range));
      }
    }
    return diagnostics;
  }
}
