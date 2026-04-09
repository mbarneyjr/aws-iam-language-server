import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind, MarkupKind } from 'vscode-languageserver';
import type { EffectValueLocation } from '../../lib/iam-policy/location.ts';
import { effects, formatEffectDocumentation } from '../../lib/iam-policy/reference/documentation.ts';
import { type CompletionContext, partialRange } from './index.ts';

export function completeEffectValue(location: EffectValueLocation, context: CompletionContext): CompletionList {
  const range = partialRange(context.position, location.partial.length);
  const items: CompletionItem[] = [];

  for (const effect in effects) {
    if (location.partial && !effects[effect].name.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
    items.push({
      label: effects[effect].name,
      kind: CompletionItemKind.Enum,
      textEdit: { range, newText: effects[effect].name },
      documentation: {
        kind: MarkupKind.Markdown,
        value: formatEffectDocumentation(effects[effect]),
      },
    });
  }
  return { items, isIncomplete: false };
}
