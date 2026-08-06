import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ConditionKey, ServiceData } from '../src/lib/iam-policy/reference/types.ts';

const DATA_DIR = join(import.meta.dirname, '..', 'src', 'data');
const SERVICE_REF_DIR = join(DATA_DIR, 'servicereference');
const SERVICES_DIR = join(SERVICE_REF_DIR, 'services');

export async function run() {
  const conditionKeys: Record<string, ConditionKey> = {};

  for (const file of readdirSync(SERVICES_DIR).sort()) {
    const serviceData: ServiceData = JSON.parse(readFileSync(join(SERVICES_DIR, file), 'utf-8'));
    for (const key of Object.values(serviceData.conditionKeys ?? {})) {
      const name = key.name.toLowerCase();
      if (!conditionKeys[name]) conditionKeys[name] = key;
    }
  }

  writeFileSync(join(SERVICE_REF_DIR, 'condition-keys.json'), JSON.stringify(conditionKeys));
  console.log(`Indexed ${Object.keys(conditionKeys).length} condition keys`);
}
