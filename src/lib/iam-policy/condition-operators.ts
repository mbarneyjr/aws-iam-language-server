export type ConditionOperator = {
  name: string;
  description: string;
};

export const conditionOperators: Record<string, ConditionOperator> = {
  StringEquals: {
    name: 'StringEquals',
    description: 'Exact matching, case sensitive',
  },
  StringEqualsIfExists: {
    name: 'StringEqualsIfExists',
    description: 'Exact matching, case sensitive; true if key is absent',
  },
  'ForAllValues:StringEquals': {
    name: 'ForAllValues:StringEquals',
    description: 'All values must match at least one policy value (case sensitive)',
  },
  'ForAnyValue:StringEquals': {
    name: 'ForAnyValue:StringEquals',
    description: 'At least one value must match a policy value (case sensitive)',
  },
  StringNotEquals: {
    name: 'StringNotEquals',
    description: 'Negated matching, case sensitive',
  },
  StringNotEqualsIfExists: {
    name: 'StringNotEqualsIfExists',
    description: 'Negated matching, case sensitive; true if key is absent',
  },
  'ForAllValues:StringNotEquals': {
    name: 'ForAllValues:StringNotEquals',
    description: 'None of the values can match any policy value (case sensitive)',
  },
  'ForAnyValue:StringNotEquals': {
    name: 'ForAnyValue:StringNotEquals',
    description: 'At least one value must not match any policy value (case sensitive)',
  },
  StringEqualsIgnoreCase: {
    name: 'StringEqualsIgnoreCase',
    description: 'Exact matching, ignoring case',
  },
  StringEqualsIgnoreCaseIfExists: {
    name: 'StringEqualsIgnoreCaseIfExists',
    description: 'Exact matching, ignoring case; true if key is absent',
  },
  'ForAllValues:StringEqualsIgnoreCase': {
    name: 'ForAllValues:StringEqualsIgnoreCase',
    description: 'All values must match at least one policy value (case insensitive)',
  },
  'ForAnyValue:StringEqualsIgnoreCase': {
    name: 'ForAnyValue:StringEqualsIgnoreCase',
    description: 'At least one value must match a policy value (case insensitive)',
  },
  StringNotEqualsIgnoreCase: {
    name: 'StringNotEqualsIgnoreCase',
    description: 'Negated matching, ignoring case',
  },
  StringNotEqualsIgnoreCaseIfExists: {
    name: 'StringNotEqualsIgnoreCaseIfExists',
    description: 'Negated matching, ignoring case; true if key is absent',
  },
  'ForAllValues:StringNotEqualsIgnoreCase': {
    name: 'ForAllValues:StringNotEqualsIgnoreCase',
    description: 'None of the values can match any policy value (case insensitive)',
  },
  'ForAnyValue:StringNotEqualsIgnoreCase': {
    name: 'ForAnyValue:StringNotEqualsIgnoreCase',
    description: 'At least one value must not match any policy value (case insensitive)',
  },
  StringLike: {
    name: 'StringLike',
    description: 'Case-sensitive matching with wildcard support (* and ?)',
  },
  StringLikeIfExists: {
    name: 'StringLikeIfExists',
    description: 'Wildcard matching; true if key is absent',
  },
  'ForAllValues:StringLike': {
    name: 'ForAllValues:StringLike',
    description: 'All values must match at least one policy value pattern',
  },
  'ForAnyValue:StringLike': {
    name: 'ForAnyValue:StringLike',
    description: 'At least one value must match a policy value pattern',
  },
  StringNotLike: {
    name: 'StringNotLike',
    description: 'Negated case-sensitive matching with wildcard support',
  },
  StringNotLikeIfExists: {
    name: 'StringNotLikeIfExists',
    description: 'Negated wildcard matching; true if key is absent',
  },
  'ForAllValues:StringNotLike': {
    name: 'ForAllValues:StringNotLike',
    description: 'None of the values can match any policy value pattern',
  },
  'ForAnyValue:StringNotLike': {
    name: 'ForAnyValue:StringNotLike',
    description: 'At least one value must not match any policy value pattern',
  },
  NumericEquals: {
    name: 'NumericEquals',
    description: 'Exact numeric matching',
  },
  NumericEqualsIfExists: {
    name: 'NumericEqualsIfExists',
    description: 'Exact numeric matching; true if key is absent',
  },
  'ForAllValues:NumericEquals': {
    name: 'ForAllValues:NumericEquals',
    description: 'All values must match at least one policy numeric value',
  },
  'ForAnyValue:NumericEquals': {
    name: 'ForAnyValue:NumericEquals',
    description: 'At least one value must match a policy numeric value',
  },
  NumericNotEquals: {
    name: 'NumericNotEquals',
    description: 'Negated numeric matching',
  },
  NumericNotEqualsIfExists: {
    name: 'NumericNotEqualsIfExists',
    description: 'Negated numeric matching; true if key is absent',
  },
  'ForAllValues:NumericNotEquals': {
    name: 'ForAllValues:NumericNotEquals',
    description: 'None of the values can match any policy numeric value',
  },
  'ForAnyValue:NumericNotEquals': {
    name: 'ForAnyValue:NumericNotEquals',
    description: 'At least one value must not match any policy numeric value',
  },
  NumericLessThan: {
    name: 'NumericLessThan',
    description: 'Less than matching',
  },
  NumericLessThanIfExists: {
    name: 'NumericLessThanIfExists',
    description: 'Less than matching; true if key is absent',
  },
  'ForAllValues:NumericLessThan': {
    name: 'ForAllValues:NumericLessThan',
    description: 'All values must be less than the policy value',
  },
  'ForAnyValue:NumericLessThan': {
    name: 'ForAnyValue:NumericLessThan',
    description: 'At least one value must be less than the policy value',
  },
  NumericLessThanEquals: {
    name: 'NumericLessThanEquals',
    description: 'Less than or equals matching',
  },
  NumericLessThanEqualsIfExists: {
    name: 'NumericLessThanEqualsIfExists',
    description: 'Less than or equals matching; true if key is absent',
  },
  'ForAllValues:NumericLessThanEquals': {
    name: 'ForAllValues:NumericLessThanEquals',
    description: 'All values must be less than or equal to the policy value',
  },
  'ForAnyValue:NumericLessThanEquals': {
    name: 'ForAnyValue:NumericLessThanEquals',
    description: 'At least one value must be less than or equal to the policy value',
  },
  NumericGreaterThan: {
    name: 'NumericGreaterThan',
    description: 'Greater than matching',
  },
  NumericGreaterThanIfExists: {
    name: 'NumericGreaterThanIfExists',
    description: 'Greater than matching; true if key is absent',
  },
  'ForAllValues:NumericGreaterThan': {
    name: 'ForAllValues:NumericGreaterThan',
    description: 'All values must be greater than the policy value',
  },
  'ForAnyValue:NumericGreaterThan': {
    name: 'ForAnyValue:NumericGreaterThan',
    description: 'At least one value must be greater than the policy value',
  },
  NumericGreaterThanEquals: {
    name: 'NumericGreaterThanEquals',
    description: 'Greater than or equals matching',
  },
  NumericGreaterThanEqualsIfExists: {
    name: 'NumericGreaterThanEqualsIfExists',
    description: 'Greater than or equals matching; true if key is absent',
  },
  'ForAllValues:NumericGreaterThanEquals': {
    name: 'ForAllValues:NumericGreaterThanEquals',
    description: 'All values must be greater than or equal to the policy value',
  },
  'ForAnyValue:NumericGreaterThanEquals': {
    name: 'ForAnyValue:NumericGreaterThanEquals',
    description: 'At least one value must be greater than or equal to the policy value',
  },
  DateEquals: {
    name: 'DateEquals',
    description: 'Matching a specific date',
  },
  DateEqualsIfExists: {
    name: 'DateEqualsIfExists',
    description: 'Date matching; true if key is absent',
  },
  'ForAllValues:DateEquals': {
    name: 'ForAllValues:DateEquals',
    description: 'All values must match a policy date value',
  },
  'ForAnyValue:DateEquals': {
    name: 'ForAnyValue:DateEquals',
    description: 'At least one value must match a policy date value',
  },
  DateNotEquals: {
    name: 'DateNotEquals',
    description: 'Negated date matching',
  },
  DateNotEqualsIfExists: {
    name: 'DateNotEqualsIfExists',
    description: 'Negated date matching; true if key is absent',
  },
  'ForAllValues:DateNotEquals': {
    name: 'ForAllValues:DateNotEquals',
    description: 'None of the values can match any policy date value',
  },
  'ForAnyValue:DateNotEquals': {
    name: 'ForAnyValue:DateNotEquals',
    description: 'At least one value must not match any policy date value',
  },
  DateLessThan: {
    name: 'DateLessThan',
    description: 'Matching before a specific date and time',
  },
  DateLessThanIfExists: {
    name: 'DateLessThanIfExists',
    description: 'Before date matching; true if key is absent',
  },
  'ForAllValues:DateLessThan': {
    name: 'ForAllValues:DateLessThan',
    description: 'All values must be before the policy date',
  },
  'ForAnyValue:DateLessThan': {
    name: 'ForAnyValue:DateLessThan',
    description: 'At least one value must be before the policy date',
  },
  DateLessThanEquals: {
    name: 'DateLessThanEquals',
    description: 'Matching at or before a specific date and time',
  },
  DateLessThanEqualsIfExists: {
    name: 'DateLessThanEqualsIfExists',
    description: 'At or before date matching; true if key is absent',
  },
  'ForAllValues:DateLessThanEquals': {
    name: 'ForAllValues:DateLessThanEquals',
    description: 'All values must be at or before the policy date',
  },
  'ForAnyValue:DateLessThanEquals': {
    name: 'ForAnyValue:DateLessThanEquals',
    description: 'At least one value must be at or before the policy date',
  },
  DateGreaterThan: {
    name: 'DateGreaterThan',
    description: 'Matching after a specific date and time',
  },
  DateGreaterThanIfExists: {
    name: 'DateGreaterThanIfExists',
    description: 'After date matching; true if key is absent',
  },
  'ForAllValues:DateGreaterThan': {
    name: 'ForAllValues:DateGreaterThan',
    description: 'All values must be after the policy date',
  },
  'ForAnyValue:DateGreaterThan': {
    name: 'ForAnyValue:DateGreaterThan',
    description: 'At least one value must be after the policy date',
  },
  DateGreaterThanEquals: {
    name: 'DateGreaterThanEquals',
    description: 'Matching at or after a specific date and time',
  },
  DateGreaterThanEqualsIfExists: {
    name: 'DateGreaterThanEqualsIfExists',
    description: 'At or after date matching; true if key is absent',
  },
  'ForAllValues:DateGreaterThanEquals': {
    name: 'ForAllValues:DateGreaterThanEquals',
    description: 'All values must be at or after the policy date',
  },
  'ForAnyValue:DateGreaterThanEquals': {
    name: 'ForAnyValue:DateGreaterThanEquals',
    description: 'At least one value must be at or after the policy date',
  },
  Bool: {
    name: 'Bool',
    description: 'Boolean matching (true or false)',
  },
  BoolIfExists: {
    name: 'BoolIfExists',
    description: 'Boolean matching; true if key is absent',
  },
  'ForAllValues:Bool': {
    name: 'ForAllValues:Bool',
    description: 'All values must match the policy boolean',
  },
  'ForAnyValue:Bool': {
    name: 'ForAnyValue:Bool',
    description: 'At least one value must match the policy boolean',
  },
  BinaryEquals: {
    name: 'BinaryEquals',
    description: 'Byte-for-byte comparison of base-64 encoded binary values',
  },
  BinaryEqualsIfExists: {
    name: 'BinaryEqualsIfExists',
    description: 'Binary value matching; true if key is absent',
  },
  'ForAllValues:BinaryEquals': {
    name: 'ForAllValues:BinaryEquals',
    description: 'All values must match a policy binary value',
  },
  'ForAnyValue:BinaryEquals': {
    name: 'ForAnyValue:BinaryEquals',
    description: 'At least one value must match a policy binary value',
  },
  IpAddress: {
    name: 'IpAddress',
    description: 'Matching a specific IP address or CIDR range',
  },
  IpAddressIfExists: {
    name: 'IpAddressIfExists',
    description: 'IP address matching; true if key is absent',
  },
  'ForAllValues:IpAddress': {
    name: 'ForAllValues:IpAddress',
    description: 'All values must match a policy IP address or CIDR range',
  },
  'ForAnyValue:IpAddress': {
    name: 'ForAnyValue:IpAddress',
    description: 'At least one value must match a policy IP address or CIDR range',
  },
  NotIpAddress: {
    name: 'NotIpAddress',
    description: 'All IP addresses except the specified IP address or CIDR range',
  },
  NotIpAddressIfExists: {
    name: 'NotIpAddressIfExists',
    description: 'Negated IP address matching; true if key is absent',
  },
  'ForAllValues:NotIpAddress': {
    name: 'ForAllValues:NotIpAddress',
    description: 'All values must not match any policy IP address or CIDR range',
  },
  'ForAnyValue:NotIpAddress': {
    name: 'ForAnyValue:NotIpAddress',
    description: 'At least one value must not match any policy IP address or CIDR range',
  },
  ArnEquals: {
    name: 'ArnEquals',
    description: 'Case-sensitive ARN matching',
  },
  ArnEqualsIfExists: {
    name: 'ArnEqualsIfExists',
    description: 'ARN matching; true if key is absent',
  },
  'ForAllValues:ArnEquals': {
    name: 'ForAllValues:ArnEquals',
    description: 'All values must match at least one policy ARN',
  },
  'ForAnyValue:ArnEquals': {
    name: 'ForAnyValue:ArnEquals',
    description: 'At least one value must match a policy ARN',
  },
  ArnLike: {
    name: 'ArnLike',
    description: 'Case-sensitive ARN matching with wildcard support (* and ?)',
  },
  ArnLikeIfExists: {
    name: 'ArnLikeIfExists',
    description: 'ARN wildcard matching; true if key is absent',
  },
  'ForAllValues:ArnLike': {
    name: 'ForAllValues:ArnLike',
    description: 'All values must match at least one policy ARN pattern',
  },
  'ForAnyValue:ArnLike': {
    name: 'ForAnyValue:ArnLike',
    description: 'At least one value must match a policy ARN pattern',
  },
  ArnNotEquals: {
    name: 'ArnNotEquals',
    description: 'Negated case-sensitive ARN matching',
  },
  ArnNotEqualsIfExists: {
    name: 'ArnNotEqualsIfExists',
    description: 'Negated ARN matching; true if key is absent',
  },
  'ForAllValues:ArnNotEquals': {
    name: 'ForAllValues:ArnNotEquals',
    description: 'None of the values can match any policy ARN',
  },
  'ForAnyValue:ArnNotEquals': {
    name: 'ForAnyValue:ArnNotEquals',
    description: 'At least one value must not match any policy ARN',
  },
  ArnNotLike: {
    name: 'ArnNotLike',
    description: 'Negated case-sensitive ARN matching with wildcard support',
  },
  ArnNotLikeIfExists: {
    name: 'ArnNotLikeIfExists',
    description: 'Negated ARN wildcard matching; true if key is absent',
  },
  'ForAllValues:ArnNotLike': {
    name: 'ForAllValues:ArnNotLike',
    description: 'None of the values can match any policy ARN pattern',
  },
  'ForAnyValue:ArnNotLike': {
    name: 'ForAnyValue:ArnNotLike',
    description: 'At least one value must not match any policy ARN pattern',
  },
  Null: {
    name: 'Null',
    description: 'Checks whether a condition key is present (true if absent, false if present)',
  },
};
