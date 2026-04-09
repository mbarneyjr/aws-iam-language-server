import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind, MarkupKind } from 'vscode-languageserver';
import type { PrincipalTypeLocation } from '../../lib/iam-policy/location.ts';
import { principalTypes } from '../../lib/iam-policy/principals.ts';
import { type CompletionContext, partialRange } from './index.ts';

export function completePrincipalType(location: PrincipalTypeLocation, context: CompletionContext): CompletionList {
  const statement = context.handler.getStatementContext(context.uri, context.position);
  const principal = statement?.Principal ?? statement?.NotPrincipal;
  const existingTypes = principal && typeof principal === 'object' ? Object.keys(principal) : [];
  const range = partialRange(context.position, location.partial.length);
  const items: CompletionItem[] = [];
  for (const [_id, principalType] of Object.entries(principalTypes)) {
    if (existingTypes.includes(principalType.name)) continue;
    if (location.partial && !principalType.name.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
    items.push({
      label: principalType.name,
      kind: CompletionItemKind.Enum,
      textEdit: { range, newText: principalType.name },
      documentation: {
        kind: MarkupKind.Markdown,
        value: principalType.description,
      },
    });
  }
  return { items, isIncomplete: false };
}
