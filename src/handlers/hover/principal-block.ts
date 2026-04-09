import { type Hover, MarkupKind } from 'vscode-languageserver';
import type { PrincipalBlockLocation } from '../../lib/iam-policy/location.ts';
import {
  formatPrincipalBlockAttributeDocumentation,
  principalBlockAttributes,
} from '../../lib/iam-policy/reference/documentation.ts';

export function handlePrincipalBlockHover(location: PrincipalBlockLocation): Hover | null {
  const principalBlockAttribute = principalBlockAttributes[location.value];
  if (!principalBlockAttribute) return null;

  return {
    range: location.range,
    contents: {
      kind: MarkupKind.Markdown,
      value: formatPrincipalBlockAttributeDocumentation(principalBlockAttribute),
    },
  };
}
