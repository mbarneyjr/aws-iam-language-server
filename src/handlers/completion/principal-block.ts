import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind, MarkupKind } from 'vscode-languageserver';
import type { PrincipalBlockLocation } from '../../lib/iam-policy/location.ts';
import type { CompletionContext } from './index.ts';

const principalBlockAttributes: Record<string, { description: string }> = {
  type: {
    description: 'The type of principal. Valid values: `*`, `AWS`, `Service`, `Federated`, `CanonicalUser`.',
  },
  identifiers: {
    description: 'List of principal identifiers. The format depends on the `type` attribute.',
  },
};

export function completePrincipalBlock(location: PrincipalBlockLocation, context: CompletionContext): CompletionList {
  const siblingKeys = context.handler.getSiblingKeys(context.uri, context.position);
  const items: CompletionItem[] = [];
  for (const [name, attr] of Object.entries(principalBlockAttributes)) {
    if (siblingKeys.includes(name)) continue;
    if (location.partial && !name.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
    items.push({
      label: name,
      kind: CompletionItemKind.Field,
      documentation: {
        kind: MarkupKind.Markdown,
        value: attr.description,
      },
    });
  }
  return { items, isIncomplete: false };
}
