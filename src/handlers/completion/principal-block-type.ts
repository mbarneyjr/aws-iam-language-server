import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind, MarkupKind } from 'vscode-languageserver';
import type { PrincipalBlockTypeLocation } from '../../lib/iam-policy/location.ts';
import { principalTypes } from '../../lib/iam-policy/principals.ts';
import { type CompletionContext, partialRange } from './index.ts';

export function completePrincipalBlockType(
  location: PrincipalBlockTypeLocation,
  context: CompletionContext,
): CompletionList {
  const range = partialRange(context.position, location.partial.length);
  const items: CompletionItem[] = [];
  for (const [_id, principalType] of Object.entries(principalTypes)) {
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
