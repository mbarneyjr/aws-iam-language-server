import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind, MarkupKind } from 'vscode-languageserver';
import type { ConditionBlockLocation } from '../../lib/iam-policy/location.ts';
import { conditionBlockAttributes } from '../../lib/iam-policy/reference/documentation.ts';
import { type CompletionContext, partialRange } from './index.ts';

export function completeConditionBlock(location: ConditionBlockLocation, context: CompletionContext): CompletionList {
  const siblingKeys = context.handler.getSiblingKeys(context.uri, context.position);
  const range = partialRange(context.position, location.partial.length);
  const items: CompletionItem[] = [];
  for (const [name, attr] of Object.entries(conditionBlockAttributes)) {
    if (siblingKeys.includes(name)) continue;
    if (location.partial && !name.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
    items.push({
      label: name,
      kind: CompletionItemKind.Field,
      textEdit: { range, newText: name },
      documentation: {
        kind: MarkupKind.Markdown,
        value: attr.description,
      },
    });
  }
  return { items, isIncomplete: false };
}
