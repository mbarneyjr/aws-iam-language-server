import type { Diagnostic } from 'vscode-languageclient';
import type { StatementEntry } from '../../lib/treesitter/base.ts';
import { ElementValidator } from './base.ts';
import { createDiagnostic } from './utils.ts';

export class EffectValidator extends ElementValidator {
  validate(entry: StatementEntry): Array<Diagnostic> {
    const diagnostics: Array<Diagnostic> = super.validate(entry);
    const value = entry.values[0]?.text;
    if (value !== 'Allow' && value !== 'Deny') {
      diagnostics.push(createDiagnostic(`effect value must be either "Allow" or "Deny"`, entry.valueRange));
    }
    return diagnostics;
  }
}
