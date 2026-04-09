import { ServiceReference } from './reference/services.ts';
import type { PrincipalType } from './reference/types.ts';

export const principalTypes: Record<string, PrincipalType> = {
  aws: {
    name: 'AWS',
    description: 'An AWS account root user, IAM user, or IAM role.',
    patterns: [
      `*`,
      `\${Account}`,
      `arn:\${Partition}:iam::\${Account}:root`,
      `arn:\${Partition}:iam::\${Account}:role/\${RoleName}`,
      `arn:\${Partition}:sts::\${Account}:assumed-role/\${RoleName}/\${RoleSessionName}`,
      `arn:\${Partition}:iam::\${Account}:user/\${UserName}`,
      `arn:\${Partition}:iam::\${Account}:federated-user/\${UserName}`,
    ],
  },
  canonicalUser: {
    name: 'CanonicalUser',
    description: 'An Amazon S3 canonical user ID.',
    patterns: [],
  },
  federated: {
    name: 'Federated',
    description: 'A SAML provider or an OpenID Connect provider.',
    patterns: [
      'cognito-identity.amazonaws.com',
      'www.amazon.com',
      'graph.facebook.com',
      'accounts.google.com',
      `arn:\${Partition}:iam::\${Account}:oidc-provider/\${OidcProviderUrl}`,
      `arn:\${Partition}:iam::\${Account}:saml-provider/\${SamlProviderName}`,
    ],
  },
  service: {
    name: 'Service',
    description: 'An AWS service principal.',
    patterns: ServiceReference.getServicePrincipals(),
  },
  '*': {
    name: '*',
    description: 'Public Unauthenticated Access',
    patterns: ['*'],
  },
};
