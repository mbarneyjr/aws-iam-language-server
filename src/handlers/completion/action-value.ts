import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind, MarkupKind } from 'vscode-languageserver';
import type { ActionValueLocation } from '../../lib/iam-policy/location.ts';
import { formatActionDocumentation } from '../../lib/iam-policy/reference/documentation.ts';
import { ServiceReference } from '../../lib/iam-policy/reference/services.ts';
import { type CompletionContext, partialRange } from './index.ts';

export function completeActionValue(location: ActionValueLocation, context: CompletionContext): CompletionList {
  const range = partialRange(context.position, location.partial.length);
  const items: CompletionItem[] = [];

  const parts = location.partial.split(':');

  if (parts.length === 1) {
    // suggest services
    const potentialServices = ServiceReference.getAllServices();
    for (const service of potentialServices) {
      if (!service.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
      const item: CompletionItem = {
        label: service,
        kind: CompletionItemKind.Enum,
        textEdit: { range, newText: service },
      };
      items.push(item);
    }
  } else if (parts.length === 2) {
    // suggest actions
    const serviceName = parts[0];
    const potentialActions = ServiceReference.getActionsForService(serviceName);
    for (const action of potentialActions) {
      const label = `${action.service}:${action.name}`;
      if (!label.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
      const item: CompletionItem = {
        label,
        kind: CompletionItemKind.Enum,
        textEdit: { range, newText: label },
      };
      if (action.description) {
        item.detail = action.description;
        item.documentation = {
          kind: MarkupKind.Markdown,
          value: formatActionDocumentation(action),
        };
      }
      items.push(item);
    }
  }

  return { items, isIncomplete: false };
}
