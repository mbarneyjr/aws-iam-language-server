import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind } from 'vscode-languageserver';
import type { EffectValueLocation } from '../../lib/iam-policy/location.ts';
import type { CompletionContext } from './index.ts';

export function completeEffectValue(location: EffectValueLocation, _context: CompletionContext): CompletionList {
  const potentialLabels = ['Allow', 'Deny'];
  const items: CompletionItem[] = [];
  for (const label of potentialLabels) {
    if (location.partial && !label.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
    items.push({
      label,
      kind: CompletionItemKind.Enum,
    });
  }
  return { items, isIncomplete: false };
}
