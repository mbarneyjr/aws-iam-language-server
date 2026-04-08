import { type Diagnostic, DiagnosticSeverity } from 'vscode-languageserver';
import type { DiagnosticRuleId } from '../../lib/diagnostics.ts';
import type { Range } from '../../lib/treesitter/base.ts';

export function createDiagnostic(
  ruleId: DiagnosticRuleId,
  message: string,
  range: Range,
  severity: DiagnosticSeverity = DiagnosticSeverity.Error,
): Diagnostic {
  return {
    source: 'aws-iam-language-server',
    severity,
    code: ruleId,
    message,
    range,
  };
}
