import { type Hover, MarkupKind } from 'vscode-languageserver';
import type { ConditionKeyLocation } from '../../lib/iam-policy/location.ts';
import { findConditionKeyByPattern } from '../../lib/iam-policy/reference/condition-key.ts';
import { formatConditionKeyDocumentation } from '../../lib/iam-policy/reference/documentation.ts';
import { ServiceReference } from '../../lib/iam-policy/reference/services.ts';

export function handleConditionKeyHover(location: ConditionKeyLocation): Hover | null {
  const keyName = location.value;
  if (!keyName) return null;

  const globalKeys = ServiceReference.getGlobalConditionKeys();
  const service = keyName.split(':')[0];

  let globalKey = globalKeys.find((k) => k.name === keyName);
  let conditionKey = service ? ServiceReference.getConditionKey(service, keyName) : undefined;
  if (!globalKey && !conditionKey) {
    const match = findConditionKeyByPattern(keyName, service);
    if (!match) return null;
    globalKey = match.global;
    conditionKey = match.conditionKey;
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
