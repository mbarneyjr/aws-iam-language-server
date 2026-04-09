import { type Hover, MarkupKind } from 'vscode-languageserver';
import type { ActionValueLocation } from '../../lib/iam-policy/location.ts';
import { formatActionDocumentation } from '../../lib/iam-policy/reference/documentation.ts';
import { ServiceReference } from '../../lib/iam-policy/reference/services.ts';
import { expandActionPattern } from '../../lib/iam-policy/wildcard.ts';

export function handleActionValueHover(location: ActionValueLocation): Hover | null {
  const actions = expandActionPattern(location.value);
  if (actions.length === 0) return null;
  if (actions.length > 16) {
    return {
      range: location.range,
      contents: {
        kind: MarkupKind.Markdown,
        value: `**${actions.length} actions**`,
      },
    };
  }

  const docs = [];
  for (const actionName of actions) {
    const action = ServiceReference.getAction(actionName);
    if (action) docs.push(formatActionDocumentation(action));
  }

  return {
    range: location.range,
    contents: {
      kind: MarkupKind.Markdown,
      value: docs.join('\n---\n'),
    },
  };
}
