import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind, MarkupKind } from 'vscode-languageserver';
import { conditionOperators } from '../../lib/iam-policy/condition-operators.ts';
import type { ConditionOperatorLocation } from '../../lib/iam-policy/location.ts';
import type { CompletionContext } from './index.ts';

export function completeConditionOperator(
  location: ConditionOperatorLocation,
  context: CompletionContext,
): CompletionList {
  const statement = context.handler.getStatementContext(context.uri, context.position);
  const existingOperators = Object.keys(statement?.Condition ?? {});
  const items: CompletionItem[] = [];
  for (const [name, operator] of Object.entries(conditionOperators)) {
    if (existingOperators.includes(name)) continue;
    if (location.partial && !name.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
    items.push({
      label: name,
      kind: CompletionItemKind.Operator,
      documentation: {
        kind: MarkupKind.Markdown,
        value: operator.description,
      },
    });
  }
  return { items, isIncomplete: false };
}
