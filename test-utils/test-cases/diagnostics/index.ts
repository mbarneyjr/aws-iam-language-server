import { readdirSync, readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';

const extToLang: Record<string, 'yaml' | 'json' | 'hcl'> = {
  '.yaml': 'yaml',
  '.yml': 'yaml',
  '.json': 'json',
  '.tf': 'hcl',
};

export interface DiagnosticTestCase {
  filename: string;
  category: string;
  lang: 'yaml' | 'json' | 'hcl';
  doc: string;
  includes?: string[];
  excludes?: string[];
  count?: number;
  code?: string;
  config?: Record<string, unknown>;
}

function parseFrontmatter(raw: string): { meta: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Missing frontmatter');
  return { meta: parseYaml(match[1]), body: match[2] };
}

function parseTestCaseFile(dir: string, category: string, filename: string): DiagnosticTestCase {
  const ext = extname(filename);
  const lang = extToLang[ext];
  if (!lang) throw new Error(`Unknown extension: ${ext}`);

  const raw = readFileSync(resolve(dir, filename), 'utf-8');
  const { meta, body } = parseFrontmatter(raw);

  return {
    filename,
    category,
    lang,
    doc: body,
    includes: meta.includes as string[] | undefined,
    excludes: meta.excludes as string[] | undefined,
    count: meta.count as number | undefined,
    code: meta.code as string | undefined,
    config: meta.config as Record<string, unknown> | undefined,
  };
}

export function loadDiagnosticTests(category: string): DiagnosticTestCase[] {
  const dir = resolve(import.meta.dirname, category);
  return readdirSync(dir)
    .filter((f) => Object.keys(extToLang).includes(extname(f)))
    .sort()
    .map((f) => parseTestCaseFile(dir, category, f));
}
