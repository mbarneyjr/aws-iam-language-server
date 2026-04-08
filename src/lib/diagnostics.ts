export type DiagnosticRule = {
  description: string;
};

export const diagnosticRules = {
  DUPLICATE_KEY: {
    description: 'Duplicate statement key',
  },
  UNRECOGNIZED_KEY: {
    description: 'Unrecognized entry in statement',
  },
  MISSING_EFFECT: {
    description: 'Missing required Effect entry',
  },
  MISSING_ACTION: {
    description: 'Missing required Action or NotAction entry',
  },
  MISSING_RESOURCE_OR_PRINCIPAL: {
    description: 'Missing required Resource/NotResource or Principal/NotPrincipal entry',
  },
  INVALID_EFFECT: {
    description: 'Effect value must be Allow or Deny',
  },
  DUPLICATE_SID: {
    description: 'Duplicate Sid value across statements',
  },
  INVALID_SID: {
    description: 'Sid contains invalid characters',
  },
  UNRECOGNIZED_ACTION: {
    description: 'Action does not match any known IAM action',
  },
  DEPENDENT_ACTION: {
    description: 'Action requires dependent actions not granted in the same statement',
  },
  INVALID_PARTITION: {
    description: 'Invalid or missing partition in resource ARN',
  },
  INVALID_REGION: {
    description: 'Invalid region for the specified partition',
  },
  INVALID_ACCOUNT: {
    description: 'Account ID must be 12 digits',
  },
} as const satisfies Record<string, DiagnosticRule>;

export type DiagnosticRuleId = keyof typeof diagnosticRules;
