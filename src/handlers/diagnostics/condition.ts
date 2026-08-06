import { type Diagnostic, DiagnosticSeverity } from 'vscode-languageserver';
import { isRuleEnabled } from '../../lib/config.ts';
import { isMultiValuedConditionKey, resolveConditionKey } from '../../lib/iam-policy/reference/condition-key.ts';
import type { Range, StatementEntry } from '../../lib/treesitter/base.ts';
import { ElementValidator } from './base.ts';
import { createDiagnostic } from './utils.ts';

const setOperatorPattern = /^(ForAnyValue|ForAllValues):/;

export class ConditionValidator extends ElementValidator {
  validate(entry: StatementEntry): Array<Diagnostic> {
    const diagnostics = super.validate(entry);

    const children = entry.children ?? [];
    const isHclBlock = children.some((child) => child.key === 'test');
    return diagnostics.concat(isHclBlock ? this.#validateHclBlock(children) : this.#validateOperators(children));
  }

  #setOperatorDiagnostic(operator: string, keyName: string, range: Range): Diagnostic | null {
    if (operator === 'Null') return null;

    const key = resolveConditionKey(keyName);
    if (!key) return null;

    const multiValued = isMultiValuedConditionKey(key);
    const setOperator = operator.match(setOperatorPattern)?.[1];

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

  #validateOperators(operators: Array<StatementEntry>): Array<Diagnostic> {
    const diagnostics: Array<Diagnostic> = [];
    for (const operator of operators) {
      for (const key of operator.children ?? []) {
        const diagnostic = this.#setOperatorDiagnostic(operator.key, key.key, operator.keyRange);
        if (diagnostic) diagnostics.push(diagnostic);
      }
    }
    return diagnostics;
  }

  #validateHclBlock(attributes: Array<StatementEntry>): Array<Diagnostic> {
    const conditionOperator = attributes.find((attribute) => attribute.key === 'test')?.values[0];
    const conditionKey = attributes.find((attribute) => attribute.key === 'variable')?.values[0];
    if (!conditionOperator || !conditionKey) return [];
    const diagnostic = this.#setOperatorDiagnostic(conditionOperator.text, conditionKey.text, conditionOperator.range);
    return diagnostic ? [diagnostic] : [];
  }
}
