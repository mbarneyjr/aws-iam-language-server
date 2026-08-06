import { ServiceReference } from './services.ts';
import type { ConditionKey } from './types.ts';

const placeholderPattern = /\$\{[^}]+\}/;

function patternToRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const withPlaceholders = escaped.replace(/\\\$\\\{[^}]+\\\}/g, '.+');
  return new RegExp(`^${withPlaceholders}$`);
}

export function findConditionKeyByPattern(keyName: string, service?: string) {
  const globalKeys = ServiceReference.getGlobalConditionKeys();
  for (const global of globalKeys) {
    if (placeholderPattern.test(global.name) && patternToRegex(global.name).test(keyName)) {
      const conditionKey = service ? ServiceReference.getConditionKey(service, global.name) : undefined;
      return { global, conditionKey };
    }
  }

  if (service) {
    const serviceData = ServiceReference.getServiceData(service);
    if (serviceData) {
      for (const name of Object.keys(serviceData.conditionKeys)) {
        if (placeholderPattern.test(name) && patternToRegex(name).test(keyName)) {
          return { conditionKey: serviceData.conditionKeys[name] };
        }
      }
    }
  }

  return null;
}

export function resolveConditionKey(keyName: string): ConditionKey | undefined {
  const service = keyName.split(':')[0];
  const global = ServiceReference.getGlobalConditionKeys().find((key) => key.name === keyName);
  if (global) return global;

  const serviceKey = ServiceReference.getConditionKey(service, keyName);
  if (serviceKey) return serviceKey;

  const match = findConditionKeyByPattern(keyName, service);
  if (!match) return undefined;
  return 'global' in match ? match.global : match.conditionKey;
}

export function isMultiValuedConditionKey(key: ConditionKey) {
  return key.types.find((t) => t.startsWith('ArrayOf')) !== undefined;
}
