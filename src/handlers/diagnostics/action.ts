import { type Diagnostic, DiagnosticSeverity } from 'vscode-languageserver';
import { isRuleEnabled } from '../../lib/config.ts';
import { ServiceReference } from '../../lib/iam-policy/reference/services.ts';
import { expandActionPattern } from '../../lib/iam-policy/wildcard.ts';
import type { PolicyDocumentNode, StatementEntry } from '../../lib/treesitter/base.ts';
import { ElementValidator } from './base.ts';
import { createDiagnostic } from './utils.ts';

export class ActionValidator extends ElementValidator {
  #policyDocument: PolicyDocumentNode;
  #actionKeys: Set<string>;
  #expandedActions: Set<string> | null = null;

  constructor(policyDocument: PolicyDocumentNode, actionKeys: Set<string>) {
    super();
    this.#policyDocument = policyDocument;
    this.#actionKeys = actionKeys;
  }

  validate(entry: StatementEntry): Array<Diagnostic> {
    const diagnostics: Array<Diagnostic> = super.validate(entry);

    for (const value of entry.values) {
      const expanded = expandActionPattern(value.text);
      if (isRuleEnabled('UNRECOGNIZED_ACTION')) {
        if (expanded.length === 0) {
          diagnostics.push(createDiagnostic('UNRECOGNIZED_ACTION', `Unrecognized action "${value.text}"`, value.range));
          continue;
        }
      }

      if (isRuleEnabled('DEPENDENT_ACTION')) {
        const allActions = this.#getExpandedActions();
        const actionDef = ServiceReference.getAction(value.text);
        if (!actionDef?.dependentActions) continue;

        const missing = actionDef.dependentActions.filter((dep) => !allActions.has(dep.toLowerCase()));
        if (missing.length > 0) {
          diagnostics.push(
            createDiagnostic(
              'DEPENDENT_ACTION',
              `"${actionDef.name}" requires dependent action(s): ${missing.join(', ')}`,
              value.range,
              DiagnosticSeverity.Warning,
            ),
          );
        }
      }
    }

    return diagnostics;
  }

  #getExpandedActions(): Set<string> {
    if (this.#expandedActions) return this.#expandedActions;

    this.#expandedActions = new Set<string>();
    for (const statement of this.#policyDocument.statements) {
      const actionEntry = statement.entries.find((e) => this.#actionKeys.has(e.key));
      if (!actionEntry) continue;
      for (const value of actionEntry.values) {
        for (const action of expandActionPattern(value.text)) {
          this.#expandedActions.add(action.toLowerCase());
        }
      }
    }
    return this.#expandedActions;
  }
}
