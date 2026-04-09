export type Services = Array<{ service: string; url: string }>;

export type RawReference = {
  Name: string;
  Version: string;
  Operations: Array<unknown>;
  Actions: Array<{
    Name: string;
    Annotations: {
      Properties: {
        IsList: boolean;
        IsPermissionManagement: boolean;
        IsTaggingOnly: boolean;
        IsWrite: boolean;
      };
    };
    SupportedBy: {
      'IAM Access Analyzer Policy Generation': boolean;
      'IAM Action Last Accessed': boolean;
    };
    Resources?: Array<{ Name: string }>;
    ActionConditionKeys?: Array<string>;
  }>;
  Resources?: Array<{
    Name: string;
    ARNFormats: Array<string>;
    ConditionKeys?: Array<string>;
  }>;
  ConditionKeys: Array<{
    Name: string;
    Types: Array<string>;
  }>;
};

export type ServiceData = {
  name: string;
  url?: string;
  actions: Record<string, Action>;
  resources: Array<ResourceDef>;
  conditionKeys: Record<string, ConditionKey>;
};

export type Action = {
  name: string;
  service: string;
  conditionKeys: Array<string>;
  resources: Array<{ name: string }>;
  description?: string;
  accessLevel?: string;
  resourceTypes?: Array<{ name: string; required: boolean }>;
  dependentActions?: Array<string>;
  permissionOnly?: boolean;
  operationUrl?: string;
  iamUrl?: string;
};

export type ResourceDef = {
  service: string;
  name: string;
  arnFormats: Array<string>;
  conditionKeys: Array<string>;
};

export type ConditionKey = {
  name: string;
  types: Array<string>;
  description?: string;
  availability?: string;
};

export type Effect = {
  name: string;
  description: string;
};

export type PrincipalBlockAttribute = {
  name: string;
  description: string;
};

export type PrincipalType = {
  name: string;
  description: string;
  patterns: Array<string>;
};

export type PrincipalTypedValue = {
  name: string;
  description: string;
};
