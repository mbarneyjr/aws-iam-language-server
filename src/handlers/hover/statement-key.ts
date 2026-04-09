import { type Connection, type Hover, MarkupKind } from 'vscode-languageserver';
import type { StatementKeyLocation } from '../../lib/iam-policy/location.ts';
import { formatStatementElementDocumentation } from '../../lib/iam-policy/reference/documentation.ts';
import { StatementKeys } from '../../lib/iam-policy/statement-keys.ts';

export function handleStatementKeyHover(_connection: Connection, location: StatementKeyLocation): Hover | null {
  const statementKey = StatementKeys[location.value];
  if (!statementKey) return null;

  return {
    range: location.range,
    contents: {
      kind: MarkupKind.Markdown,
      value: formatStatementElementDocumentation(statementKey),
    },
  };
}
