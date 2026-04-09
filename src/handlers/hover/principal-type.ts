import { type Hover, MarkupKind } from 'vscode-languageserver';
import type { PrincipalBlockTypeLocation, PrincipalTypeLocation } from '../../lib/iam-policy/location.ts';
import { principalTypes } from '../../lib/iam-policy/principals.ts';
import { formatPrincipalTypeDocumentation } from '../../lib/iam-policy/reference/documentation.ts';

export function handlePrincipalTypeHover(location: PrincipalTypeLocation | PrincipalBlockTypeLocation): Hover | null {
  for (const principalType of Object.values(principalTypes)) {
    if (principalType.name === location.value) {
      return {
        range: location.range,
        contents: {
          kind: MarkupKind.Markdown,
          value: formatPrincipalTypeDocumentation(principalType),
        },
      };
    }
  }

  return null;
}
