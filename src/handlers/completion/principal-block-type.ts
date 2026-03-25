import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind } from 'vscode-languageserver';
import type { PrincipalBlockTypeLocation } from '../../lib/iam-policy/location.ts';
import { principalTypes } from '../../lib/iam-policy/principals.ts';
import type { CompletionContext } from './index.ts';

export function completePrincipalBlockType(
  location: PrincipalBlockTypeLocation,
  _context: CompletionContext,
): CompletionList {
  const items: CompletionItem[] = [];
  for (const [_id, principalType] of Object.entries(
    Object.assign({}, principalTypes, {
      '*': {
        value: '*',
        description: 'Public Unauthenticated Access',
        patterns: ['*'],
      },
    }),
  )) {
    if (location.partial && !principalType.value.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
    items.push({
      label: principalType.value,
      kind: CompletionItemKind.Enum,
      documentation: {
        kind: 'markdown',
        value: principalType.description,
      },
    });
  }
  return { items, isIncomplete: false };
}
