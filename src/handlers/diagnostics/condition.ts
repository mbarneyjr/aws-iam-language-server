import { type Diagnostic, DiagnosticSeverity } from 'vscode-languageserver';
import { isRuleEnabled } from '../../lib/config.ts';
import { conditionOperators } from '../../lib/iam-policy/condition-operators.ts';
import {
  isKnownConditionKeyNamespace,
  isMultiValuedConditionKey,
  resolveConditionKey,
} from '../../lib/iam-policy/reference/condition-key.ts';
import type { Range, StatementEntry } from '../../lib/treesitter/base.ts';
import { ElementValidator } from './base.ts';
import { createDiagnostic } from './utils.ts';

const setOperatorPattern = /^(ForAnyValue|ForAllValues):/;

// The operator data enumerates set operator and IfExists spellings separately, and omits the
// combination of the two, so validate the bare operator name and its modifiers independently.
const bareOperators = new Set(
  Object.keys(conditionOperators).filter((name) => !name.includes(':') && !name.endsWith('IfExists')),
);

function isValidConditionOperator(operator: string): boolean {
  const hasSetOperator = setOperatorPattern.test(operator);
  const withoutSetOperator = operator.replace(setOperatorPattern, '');
  const hasIfExists = withoutSetOperator.endsWith('IfExists');
  const bareOperator = hasIfExists ? withoutSetOperator.slice(0, -'IfExists'.length) : withoutSetOperator;

  if (!bareOperators.has(bareOperator)) return false;
  // Null tests for key presence, so it takes neither modifier.
  if (bareOperator === 'Null') return !hasSetOperator && !hasIfExists;
  return true;
}

export class ConditionValidator extends ElementValidator {
  validate(entry: StatementEntry, effect?: string): Array<Diagnostic> {
    const diagnostics = super.validate(entry);

    const children = entry.children ?? [];
    const isHclBlock = children.some((child) => child.key === 'test');
    return diagnostics.concat(
      isHclBlock ? this.#validateHclBlock(children, effect ?? '') : this.#validateOperators(children, effect ?? ''),
    );
  }

  #setOperatorDiagnostic(operator: string, keyName: string, range: Range, effect: string): Diagnostic | null {
    if (operator === 'Null') return null;

    const key = resolveConditionKey(keyName);
    if (!key) return null;

    const multiValued = isMultiValuedConditionKey(key);
    const setOperator = operator.match(setOperatorPattern)?.[1];

    if (
      isRuleEnabled('PERMISSIVE_SET_OPERATOR') &&
      setOperator === 'ForAllValues' &&
      multiValued &&
      effect === 'Allow'
    ) {
      return createDiagnostic(
        'PERMISSIVE_SET_OPERATOR',
        `"ForAllValues:" evaluates to true when "${keyName}" is absent from the request, so this "Allow" grants access instead of restricting it (pair it with a "Null" check on "${keyName}", or use "Deny")`,
        range,
        DiagnosticSeverity.Error,
      );
    }

    if (isRuleEnabled('MISSING_SET_OPERATOR') && multiValued && !setOperator) {
      return createDiagnostic(
        'MISSING_SET_OPERATOR',
        `"${keyName}" is a multi-valued condition key and requires a "ForAnyValue:" or "ForAllValues:" prefix on the operator (e.g. "ForAnyValue:${operator}")`,
        range,
        DiagnosticSeverity.Warning,
      );
    }

    if (isRuleEnabled('UNNECESSARY_SET_OPERATOR') && !multiValued && setOperator) {
      const plainOperator = operator.replace(setOperatorPattern, '');
      const consequence =
        setOperator === 'ForAllValues' ? ' and evaluates to true when the key is absent from the request' : '';
      return createDiagnostic(
        'UNNECESSARY_SET_OPERATOR',
        `"${keyName}" is a single-valued condition key, so "${setOperator}:" is unnecessary${consequence} (use "${plainOperator}")`,
        range,
        DiagnosticSeverity.Warning,
      );
    }

    return null;
  }

  #operatorDiagnostic(operator: string, range: Range): Diagnostic | null {
    if (!isRuleEnabled('INVALID_CONDITION_OPERATOR') || isValidConditionOperator(operator)) return null;
    return createDiagnostic('INVALID_CONDITION_OPERATOR', `"${operator}" is not a valid condition operator`, range);
  }

  #keyDiagnostic(keyName: string, range: Range): Diagnostic | null {
    if (!isRuleEnabled('UNRECOGNIZED_CONDITION_KEY')) return null;
    if (!isKnownConditionKeyNamespace(keyName) || resolveConditionKey(keyName)) return null;
    return createDiagnostic('UNRECOGNIZED_CONDITION_KEY', `Unrecognized condition key "${keyName}"`, range);
  }

  #validateOperators(operators: Array<StatementEntry>, effect: string): Array<Diagnostic> {
    const diagnostics: Array<Diagnostic> = [];
    for (const operator of operators) {
      const operatorDiagnostic = this.#operatorDiagnostic(operator.key, operator.keyRange);
      if (operatorDiagnostic) diagnostics.push(operatorDiagnostic);

      for (const key of operator.children ?? []) {
        const keyDiagnostic = this.#keyDiagnostic(key.key, key.keyRange);
        if (keyDiagnostic) diagnostics.push(keyDiagnostic);

        const diagnostic = this.#setOperatorDiagnostic(operator.key, key.key, operator.keyRange, effect);
        if (diagnostic) diagnostics.push(diagnostic);
      }
    }
    return diagnostics;
  }

  #validateHclBlock(attributes: Array<StatementEntry>, effect: string): Array<Diagnostic> {
    const conditionOperator = attributes.find((attribute) => attribute.key === 'test')?.values[0];
    const conditionKey = attributes.find((attribute) => attribute.key === 'variable')?.values[0];
    if (!conditionOperator || !conditionKey) return [];

    const diagnostics: Array<Diagnostic> = [];
    const operatorDiagnostic = this.#operatorDiagnostic(conditionOperator.text, conditionOperator.range);
    if (operatorDiagnostic) diagnostics.push(operatorDiagnostic);

    const keyDiagnostic = this.#keyDiagnostic(conditionKey.text, conditionKey.range);
    if (keyDiagnostic) diagnostics.push(keyDiagnostic);

    const diagnostic = this.#setOperatorDiagnostic(
      conditionOperator.text,
      conditionKey.text,
      conditionOperator.range,
      effect,
    );
    if (diagnostic) diagnostics.push(diagnostic);
    return diagnostics;
  }
}
