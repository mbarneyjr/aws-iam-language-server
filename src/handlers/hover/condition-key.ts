import { type Hover, MarkupKind } from 'vscode-languageserver';
import type { ConditionKeyLocation } from '../../lib/iam-policy/location.ts';
import {
  conditionKeyService,
  findConditionKeyByPattern,
  resolveConditionKey,
} from '../../lib/iam-policy/reference/condition-key.ts';
import { formatConditionKeyDocumentation } from '../../lib/iam-policy/reference/documentation.ts';
import { ServiceReference } from '../../lib/iam-policy/reference/services.ts';

export function handleConditionKeyHover(location: ConditionKeyLocation): Hover | null {
  const keyName = location.value;
  if (!keyName) return null;

  const globalKeys = ServiceReference.getGlobalConditionKeys();
  const service = conditionKeyService(keyName);
  const lowerKeyName = keyName.toLowerCase();

  let globalKey = globalKeys.find((k) => k.name.toLowerCase() === lowerKeyName);
  let conditionKey = service ? ServiceReference.getConditionKey(service, keyName) : undefined;
  if (!globalKey && !conditionKey) {
    const match = findConditionKeyByPattern(keyName, service);
    if (match) {
      globalKey = 'global' in match ? match.global : undefined;
      conditionKey = match.conditionKey;
    } else {
      // A service reference can define another service's keys, so fall back to the flattened index.
      conditionKey = resolveConditionKey(keyName);
    }
    if (!globalKey && !conditionKey) return null;
  }

  const keyDocs = [];
  if (globalKey) keyDocs.push(formatConditionKeyDocumentation(globalKey));
  if (conditionKey) keyDocs.push(formatConditionKeyDocumentation(conditionKey));

  return {
    range: location.range,
    contents: {
      kind: MarkupKind.Markdown,
      value: keyDocs.join('\n---\n'),
    },
  };
}
