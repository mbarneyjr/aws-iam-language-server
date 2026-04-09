import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind, MarkupKind } from 'vscode-languageserver';
import type { ConditionKeyLocation } from '../../lib/iam-policy/location.ts';
import { formatConditionKeyDocumentation } from '../../lib/iam-policy/reference/documentation.ts';
import { ServiceReference } from '../../lib/iam-policy/reference/services.ts';
import type { ConditionKey } from '../../lib/iam-policy/reference/types.ts';
import { expandActionPattern } from '../../lib/iam-policy/wildcard.ts';
import { type CompletionContext, partialRange } from './index.ts';

export function completeConditionKey(location: ConditionKeyLocation, context: CompletionContext): CompletionList {
  const statement = context.handler.getStatementContext(context.uri, context.position);
  const existingKeys = location.operator ? Object.keys(statement?.Condition?.[location.operator] ?? {}) : [];
  const range = partialRange(context.position, location.partial.length);
  const items: CompletionItem[] = [];
  const seen = new Set<string>();

  // Build a lookup for global keys so we can enrich service-specific keys with descriptions
  const globalByName = new Map<string, ConditionKey>();
  for (const global of ServiceReference.getGlobalConditionKeys()) {
    globalByName.set(global.name, global);
  }

  // Action-specific condition keys
  const actions = statement?.Action ?? statement?.NotAction;
  if (actions && actions.length > 0) {
    const expandedActions: string[] = [];
    for (const action of actions) {
      for (const expanded of expandActionPattern(action)) {
        expandedActions.push(expanded);
      }
    }

    for (const key of ServiceReference.getConditionKeysForActions(expandedActions)) {
      if (seen.has(key.name)) continue;
      if (existingKeys.includes(key.name)) continue;
      if (location.partial && !key.name.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
      seen.add(key.name);
      const globalKey = globalByName.get(key.name);
      const keyDocs = [];
      if (globalKey) keyDocs.push(formatConditionKeyDocumentation(globalKey));
      if (key) keyDocs.push(formatConditionKeyDocumentation(key));
      items.push({
        label: key.name,
        kind: CompletionItemKind.Property,
        textEdit: { range, newText: key.name },
        documentation: {
          kind: MarkupKind.Markdown,
          value: keyDocs.join('\n---\n'),
        },
      });
    }
  }

  // Global condition keys not already added via action-specific keys
  for (const global of ServiceReference.getGlobalConditionKeys()) {
    if (seen.has(global.name)) continue;
    if (existingKeys.includes(global.name)) continue;
    if (location.partial && !global.name.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
    seen.add(global.name);
    items.push({
      label: global.name,
      kind: CompletionItemKind.Property,
      textEdit: { range, newText: global.name },
      documentation: {
        kind: MarkupKind.Markdown,
        value: formatConditionKeyDocumentation(global),
      },
    });
  }

  return { items, isIncomplete: false };
}
