import { type DiagnosticRuleId, diagnosticRules } from './diagnostics.ts';

export type DiagnosticRuleConfig = {
  enabled: boolean;
};

export type ServerConfig = {
  diagnostics: Record<DiagnosticRuleId, DiagnosticRuleConfig>;
};

function createDefaults(): ServerConfig {
  const diagnostics = {} as Record<DiagnosticRuleId, DiagnosticRuleConfig>;
  for (const key of Object.keys(diagnosticRules) as DiagnosticRuleId[]) {
    diagnostics[key] = { enabled: true };
  }
  return { diagnostics };
}

const config: ServerConfig = createDefaults();

export function getConfig(): ServerConfig {
  return config;
}

export function isRuleEnabled(ruleId: DiagnosticRuleId): boolean {
  return config.diagnostics[ruleId].enabled;
}

export function resetConfig() {
  const defaults = createDefaults();
  for (const key of Object.keys(diagnosticRules) as DiagnosticRuleId[]) {
    config.diagnostics[key] = defaults.diagnostics[key];
  }
}

export function updateConfig(settings: Record<string, unknown> | undefined) {
  if (!settings) return;

  const diagnostics = settings.diagnostics as Record<string, unknown> | undefined;
  if (!diagnostics) return;

  for (const key of Object.keys(diagnosticRules) as DiagnosticRuleId[]) {
    const ruleConfig = diagnostics[key] as Record<string, unknown> | undefined;
    if (ruleConfig && typeof ruleConfig.enabled === 'boolean') {
      config.diagnostics[key].enabled = ruleConfig.enabled;
    }
  }
}
