import { type DiagnosticRuleId, diagnosticRules } from './diagnostics.ts';

export type DiagnosticRuleConfig = {
  enabled: boolean;
};

export type DiagnosticsConfig = Record<DiagnosticRuleId, DiagnosticRuleConfig> & { enabled: boolean };

export type ServerConfig = {
  diagnostics: DiagnosticsConfig;
  hover: { enabled: boolean };
  documentLink: { enabled: boolean };
};

function createDefaults(): ServerConfig {
  const diagnostics = { enabled: true } as DiagnosticsConfig;
  for (const key of Object.keys(diagnosticRules) as DiagnosticRuleId[]) {
    diagnostics[key] = { enabled: true };
  }
  return { diagnostics, hover: { enabled: true }, documentLink: { enabled: true } };
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
  config.diagnostics.enabled = defaults.diagnostics.enabled;
  for (const key of Object.keys(diagnosticRules) as DiagnosticRuleId[]) {
    config.diagnostics[key] = defaults.diagnostics[key];
  }
  config.hover = defaults.hover;
  config.documentLink = defaults.documentLink;
}

export function updateConfig(settings: Record<string, unknown> | undefined) {
  if (!settings) return;

  const diagnostics = settings.diagnostics as Record<string, unknown> | undefined;
  if (diagnostics) {
    if (typeof diagnostics.enabled === 'boolean') {
      config.diagnostics.enabled = diagnostics.enabled;
    }
    for (const key of Object.keys(diagnosticRules) as DiagnosticRuleId[]) {
      const ruleConfig = diagnostics[key] as Record<string, unknown> | undefined;
      if (ruleConfig && typeof ruleConfig.enabled === 'boolean') {
        config.diagnostics[key].enabled = ruleConfig.enabled;
      }
    }
  }

  const hover = settings.hover as Record<string, unknown> | undefined;
  if (hover && typeof hover.enabled === 'boolean') {
    config.hover.enabled = hover.enabled;
  }

  const documentLink = settings.documentLink as Record<string, unknown> | undefined;
  if (documentLink && typeof documentLink.enabled === 'boolean') {
    config.documentLink.enabled = documentLink.enabled;
  }
}
