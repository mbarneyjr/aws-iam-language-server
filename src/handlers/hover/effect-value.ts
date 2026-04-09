import { type Hover, MarkupKind } from 'vscode-languageserver';
import type { EffectValueLocation } from '../../lib/iam-policy/location.ts';
import { effects, formatEffectDocumentation } from '../../lib/iam-policy/reference/documentation.ts';

export function handleEffectValueHover(location: EffectValueLocation): Hover | null {
  const effect = effects[location.value];
  if (!effect) return null;

  return {
    range: location.range,
    contents: {
      kind: MarkupKind.Markdown,
      value: formatEffectDocumentation(effect),
    },
  };
}
