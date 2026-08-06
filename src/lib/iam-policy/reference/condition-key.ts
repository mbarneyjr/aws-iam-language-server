import { ServiceReference } from './services.ts';
import type { ConditionKey } from './types.ts';

const placeholderPattern = /\$\{[^}]+\}/;

function patternToRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const withPlaceholders = escaped.replace(/\\\$\\\{[^}]+\\\}/g, '.+');
  return new RegExp(`^${withPlaceholders}$`, 'i');
}

export function conditionKeyService(keyName: string): string | undefined {
  const [service, ...rest] = keyName.split(':');
  if (!service || rest.length === 0) return undefined;
  return service.toLowerCase();
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
  const service = conditionKeyService(keyName);
  const lowerKeyName = keyName.toLowerCase();

  const global = ServiceReference.getGlobalConditionKeys().find((key) => key.name.toLowerCase() === lowerKeyName);
  if (global) return global;

  const serviceKeys = service ? ServiceReference.getServiceData(service)?.conditionKeys : undefined;
  if (serviceKeys) {
    const name = Object.keys(serviceKeys).find((key) => key.toLowerCase() === lowerKeyName);
    if (name) return serviceKeys[name];
  }

  const match = findConditionKeyByPattern(keyName, service);
  if (match) return 'global' in match ? match.global : match.conditionKey;

  // No placeholder key is defined outside its own service, so an exact lookup is enough here.
  return ServiceReference.getAllConditionKeys()[lowerKeyName];
}

export function isKnownConditionKeyNamespace(keyName: string): boolean {
  const service = conditionKeyService(keyName);
  if (!service) return false;
  return service === 'aws' || ServiceReference.getServiceData(service) !== undefined;
}

export function isMultiValuedConditionKey(key: ConditionKey) {
  return key.types.find((t) => t.startsWith('ArrayOf')) !== undefined;
}
