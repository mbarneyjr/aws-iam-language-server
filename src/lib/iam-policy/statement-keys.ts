export type PolicyElement = {
  name: string;
  policyTypes: Array<'identity' | 'resource'>;
  description: string;
  group: string;
  hclKey: string;
};

export const StatementKeys: Record<string, PolicyElement> = {
  Sid: {
    name: 'Sid',
    policyTypes: ['identity', 'resource'],
    description: [
      'An optional identifier for a policy statement.',
      'Use it as a descriptive label to distinguish statements within a policy.',
      'The `Sid` value must be unique within a policy document.',
      'It may only contain ASCII uppercase letters (A-Z), lowercase letters (a-z), and numbers (0-9).',
    ].join('\n'),
    hclKey: 'sid',
    group: 'sid',
  },
  Effect: {
    name: 'Effect',
    policyTypes: ['identity', 'resource'],
    description: [
      'A required element that specifies whether the statement allows or explicitly denies access.',
      'Valid values are `Allow` and `Deny` (case-sensitive).',
      'By default, access to resources is implicitly denied.',
      'Set `Effect` to `Allow` to grant access and set `Effect` to `Deny` to explicitly deny access.',
    ].join('\n'),
    hclKey: 'effect',
    group: 'effect',
  },
  Principal: {
    name: 'Principal',
    policyTypes: ['resource'],
    description: [
      'Specifies the principal that is allowed or denied access to a resource.',
      'Required in resource-based policies, but cannot be used in identity-based policies.',
      'The value can be an AWS account, IAM user, IAM role, federated identity, AWS service, or canonical user.',
    ].join('\n'),
    group: 'principal',
    hclKey: 'principals',
  },
  NotPrincipal: {
    name: 'NotPrincipal',
    policyTypes: ['resource'],
    description: [
      'Matches every principal *except* the ones specified.',
      'Must be used with `"Effect": "Deny"`, using it with `"Effect": "Allow"` is not supported.',
      'Only valid in resource-based policies, it is not supported in identity-based policies.',
      'When specifying an IAM user or role, you must also include the account ARN.',
    ].join('\n'),
    group: 'principal',
    hclKey: 'not_principals',
  },
  Action: {
    name: 'Action',
    policyTypes: ['identity', 'resource'],
    description: [
      'Specifies the actions that the statement allows or denies.',
      'Actions use the format `service:action` (e.g. `s3:GetObject`, `iam:CreateUser`).',
      'Action names are case-insensitive.',
    ].join('\n'),
    group: 'action',
    hclKey: 'actions',
  },
  NotAction: {
    name: 'NotAction',
    policyTypes: ['identity', 'resource'],
    description: [
      'Matches every action *except* the ones specified.',
      'With `"Effect": "Allow"`, grants access to all applicable actions except those listed.',
      'With `"Effect": "Deny"`, denies all applicable actions except those listed.',
      'The `Resource` element determines which actions and services are applicable.',
    ].join('\n'),
    group: 'action',
    hclKey: 'not_actions',
  },
  Resource: {
    name: 'Resource',
    policyTypes: ['identity', 'resource'],
    description: [
      'Specifies the object or objects that the statement applies to.',
      'Each statement must include either `Resource` or `NotResource`.',
      'Resources are identified by ARN (e.g. `arn:aws:s3:::my-bucket/*`).',
      'Some actions do not support resource-level permissions.',
      'In those cases, use `"Resource": "*"` to apply the statement to all resources.',
    ].join('\n'),
    group: 'resource',
    hclKey: 'resources',
  },
  NotResource: {
    name: 'NotResource',
    policyTypes: ['identity', 'resource'],
    description: [
      'Matches every resource *except* the ones specified.',
      'With `"Effect": "Deny"`, denies access to all resources except those listed.',
      'With `"Effect": "Allow"`, grants access to all resources except those listed.',
    ].join('\n'),
    group: 'resource',
    hclKey: 'not_resources',
  },
  Condition: {
    name: 'Condition',
    policyTypes: ['identity', 'resource'],
    description: [
      'An optional element that specifies conditions under which the statement is in effect.',
      'Condition keys are either **global** (available across all services) or **service-specific**.',
      'Condition key names are case-insensitive.',
      'Values are case-sensitive unless using a case-insensitive operator like `StringEqualsIgnoreCase`.',
      'When multiple values are specified for a single key, they are evaluated as **OR**.',
      'When multiple keys or operators are specified, they are evaluated as **AND**.',
      'If a condition key is not present in the request context, it does not match, except when using `ForAllValues`.',
    ].join('\n'),
    hclKey: 'condition',
    group: 'condition',
  },
};
