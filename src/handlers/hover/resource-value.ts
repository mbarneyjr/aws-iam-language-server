import { type Hover, MarkupKind } from 'vscode-languageserver';
import { parseArn } from '../../lib/iam-policy/arn.ts';
import type { ResourceValueLocation } from '../../lib/iam-policy/location.ts';
import { formatResourceDocumentation } from '../../lib/iam-policy/reference/documentation.ts';
import { ServiceReference } from '../../lib/iam-policy/reference/services.ts';

export function handleResourceValueHover(location: ResourceValueLocation): Hover | null {
  if (location.value === '*') {
    return {
      range: location.range,
      contents: {
        kind: MarkupKind.Markdown,
        value:
          'Matches **all resources**.\n\nSome actions do not support resource-level permissions and require `"Resource": "*"`.',
      },
    };
  }

  const parsed = parseArn(location.value);
  if (!parsed) return null;

  const resources = ServiceReference.getResources(parsed);
  if (resources.length === 0) return null;

  const docs = [];
  for (const resource of resources) {
    docs.push(formatResourceDocumentation(resource));
  }

  return {
    range: location.range,
    contents: {
      kind: MarkupKind.Markdown,
      value: docs.join('\n---\n'),
    },
  };
}
