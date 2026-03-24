import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind } from 'vscode-languageserver';
import type { PrincipalValueLocation } from '../../lib/iam-policy/location.ts';
import type { CompletionContext } from './index.ts';

export function completePrincipalValue(location: PrincipalValueLocation, _context: CompletionContext): CompletionList {
  const potentialLabels = ['*'];
  const items: CompletionItem[] = [];
  for (const label of potentialLabels) {
    if (location.partial && !label.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
    items.push({
      label,
      kind: CompletionItemKind.Enum,
      documentation: {
        kind: 'markdown',
        value: '# Public Unauthenticated Access',
      },
    });
  }
  return { items, isIncomplete: false };
}
