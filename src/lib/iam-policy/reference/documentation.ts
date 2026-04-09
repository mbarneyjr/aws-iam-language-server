import type { ConditionOperator } from '../condition-operators.ts';
import type { PolicyElement } from '../statement-keys.ts';
import type {
  Action,
  ConditionKey,
  Effect,
  PrincipalBlockAttribute,
  PrincipalType,
  PrincipalTypedValue,
  ResourceDef,
} from './types.ts';

export const conditionBlockAttributes: Record<string, { description: string }> = {
  test: {
    description: 'The condition operator to evaluate (e.g., `StringEquals`, `ArnLike`, `IpAddress`).',
  },
  variable: {
    description: 'The condition key to evaluate (e.g., `aws:SourceIp`, `s3:prefix`).',
  },
  values: {
    description: 'List of values to compare against the condition key.',
  },
};

export const effects: Record<string, Effect> = {
  Allow: {
    name: 'Allow',
    description: [
      'Grants access to the specified resources and actions.',
      'By default, all requests are implicitly denied.',
      'An `Allow` overrides implicit denies but never overrides an explicit `Deny`.',
    ].join('\n'),
  },
  Deny: {
    name: 'Deny',
    description: [
      'Explicitly denies access to the specified resources and actions.',
      'An explicit `Deny` always takes precedence, it overrides any `Allow` statements.',
    ].join('\n'),
  },
};

export const principalBlockAttributes: Record<string, PrincipalBlockAttribute> = {
  type: {
    name: 'type',
    description: 'The type of principal. Valid values: `*`, `AWS`, `Service`, `Federated`, `CanonicalUser`.',
  },
  identifiers: {
    name: 'identifiers',
    description: 'List of principal identifiers. The format depends on the `type` attribute.',
  },
};

export const principalTypedValues = {
  '*': {
    name: 'Everyone',
    description: 'All principals of this type',
  },
  Service: {
    name: 'AWS Service',
    description: 'Grants a service access to this resource',
  },
  Account: {
    name: 'AWS Account',
    description: 'Grants all entities within an account access to this resource',
  },
  Role: {
    name: 'IAM Role',
    description: 'Grants a specific role access to this resource',
  },
  RoleSession: {
    name: 'Assumed Role Session',
    description: 'Grants a specific role session access to this resource',
  },
  User: {
    name: 'IAM User',
    description: 'Grants a specific user access to this resource',
  },
  FederatedOidc: {
    name: 'Federated OIDC Provider',
    description: 'Grants a specific OIDC IdP access to this resource',
  },
  FederatedSaml: {
    name: 'Federated SAML Provider',
    description: 'Grants a specific SAML IdP access to this resource',
  },
  FederatedIdentity: {
    name: 'Federated Identity',
    description: 'Grants an integrated IdP access to this resource',
  },
} satisfies Record<string, PrincipalTypedValue>;

export function formatStatementElementDocumentation(element: PolicyElement) {
  const parts: string[] = [];
  parts.push(`**${element.name}**`);
  parts.push(`_${element.description}_`);
  parts.push(`\n**Policy Types**: ${element.policyTypes.join(',')}`);
  return parts.join('\n');
}

export function formatActionDocumentation(action: Action) {
  const parts: string[] = [];
  parts.push(`**${action.service}:${action.name}**`);
  if (action.description) parts.push(`_${action.description}_`);

  if (action.accessLevel) parts.push(`\n**Access Level**: _${action.accessLevel}_`);

  if (action.resourceTypes && action.resourceTypes.length > 0) {
    parts.push(`\n**Resource types**`);
    for (const resource of action.resourceTypes) {
      if (resource.required) parts.push(`- \`${resource.name}\` _*(required)*_`);
      else parts.push(`- \`${resource.name}\``);
    }
  }

  if (action.conditionKeys.length > 0) {
    parts.push(`\n**Condition keys**`);
    for (const conditionKey of action.conditionKeys) {
      parts.push(`- \`${conditionKey}\``);
    }
  }

  if (action.dependentActions && action.dependentActions.length > 0) {
    parts.push(`\n**Dependent actions:**`);
    for (const dependentAction of action.dependentActions) {
      parts.push(`- \`${dependentAction}\``);
    }
  }

  return parts.join('\n');
}

export function formatResourceDocumentation(resource: ResourceDef) {
  const parts: string[] = [];
  parts.push(`**${resource.service}/${resource.name}**`);

  if (resource.arnFormats.length > 0) {
    parts.push(`\n**ARN Formats**`);
    for (const conditionKey of resource.conditionKeys) {
      parts.push(`- \`${conditionKey}\``);
    }
  }
  if (resource.conditionKeys.length > 0) {
    parts.push(`\n**Condition Keys**`);
    for (const conditionKey of resource.conditionKeys) {
      parts.push(`- \`${conditionKey}\``);
    }
  }

  return parts.join('\n');
}

export function formatConditionKeyDocumentation(conditionKey: ConditionKey): string {
  const parts: string[] = [];
  parts.push(`**${conditionKey.name}**`);
  if (conditionKey.description) parts.push(`_${conditionKey.description}_`);
  if (conditionKey.types.length > 0) parts.push(`\n**Type:** _${conditionKey.types.join(',')}_`);
  if (conditionKey.availability) parts.push(`\n**Availability:** _${conditionKey.availability}_`);
  return parts.join('\n');
}

export function formatConditionOperatorDocumentation(operator: ConditionOperator) {
  const parts: string[] = [];
  parts.push(`**${operator.name}**`);
  parts.push(`_${operator.description}_`);
  return parts.join('\n');
}

export function formatEffectDocumentation(effect: Effect) {
  const parts: string[] = [];
  parts.push(`**${effect.name}**`);
  parts.push(`_${effect.description}_`);
  return parts.join('\n');
}

export function formatPrincipalBlockAttributeDocumentation(attribute: PrincipalBlockAttribute) {
  const parts: string[] = [];
  parts.push(`**${attribute.name}**`);
  parts.push(`_${attribute.description}_`);
  return parts.join('\n');
}

export function formatPrincipalTypeDocumentation(principal: PrincipalType) {
  const parts: string[] = [];
  parts.push(`**${principal.name}**`);
  parts.push(`_${principal.description}_`);
  return parts.join('\n');
}

export function formatPrincipalTypedValueDocumentation(principal: PrincipalTypedValue) {
  const parts: string[] = [];
  parts.push(`**${principal.name}**`);
  parts.push(`_${principal.description}_`);
  return parts.join('\n');
}
