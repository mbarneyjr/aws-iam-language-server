import { ServiceReference } from './reference/services.ts';

export function wildcardToRegExp(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  const regexStr = escaped.replace(/\*/g, '.*').replace(/\?/g, '.');
  return new RegExp(`^${regexStr}$`, 'i');
}

export function expandActionPattern(pattern: string): string[] {
  const allActions = ServiceReference.getAllActions();
  if (!pattern.includes('*') && !pattern.includes('?')) {
    return allActions.some((a) => a.toLowerCase() === pattern.toLowerCase()) ? [pattern] : [];
  }
  const regex = wildcardToRegExp(pattern);
  return allActions.filter((a) => regex.test(a));
}
