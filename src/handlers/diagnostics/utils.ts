import type { Diagnostic, Range as DiagnosticRange } from 'vscode-languageclient';
import type { Range } from '../../lib/treesitter/base.ts';

export function createDiagnostic(message: string, range: Range): Diagnostic {
  return {
    source: 'aws-iam-language-server',
    message,
    range: convertRangeToDiagnosticRange(range),
  };
}

function convertRangeToDiagnosticRange(range: Range): DiagnosticRange {
  return {
    start: {
      character: range.start.column,
      line: range.start.line,
    },
    end: {
      character: range.end.column,
      line: range.end.line,
    },
  };
}
