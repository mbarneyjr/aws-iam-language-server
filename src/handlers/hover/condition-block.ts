import { type Hover, MarkupKind } from 'vscode-languageserver';
import type { ConditionBlockLocation } from '../../lib/iam-policy/location.ts';
import { conditionBlockAttributes } from '../../lib/iam-policy/reference/documentation.ts';

export function handleConditionBlockHover(location: ConditionBlockLocation): Hover | null {
  const attr = conditionBlockAttributes[location.value];
  if (!attr) return null;

  return {
    range: location.range,
    contents: {
      kind: MarkupKind.Markdown,
      value: attr.description,
    },
  };
}
