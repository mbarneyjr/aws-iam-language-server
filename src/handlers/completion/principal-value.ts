import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind, MarkupKind } from 'vscode-languageserver';
import type { PrincipalValueLocation } from '../../lib/iam-policy/location.ts';
import { type CompletionContext, partialRange } from './index.ts';

export function completePrincipalValue(location: PrincipalValueLocation, context: CompletionContext): CompletionList {
  const potentialLabels = ['*'];
  const range = partialRange(context.position, location.partial.length);
  const items: CompletionItem[] = [];
  for (const label of potentialLabels) {
    if (location.partial && !label.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
    items.push({
      label,
      kind: CompletionItemKind.Enum,
      textEdit: { range, newText: label },
      documentation: {
        kind: MarkupKind.Markdown,
        value: 'Public Unauthenticated Access',
      },
    });
  }
  return { items, isIncomplete: false };
}
