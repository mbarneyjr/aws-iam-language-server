import type { Language, Tree } from 'web-tree-sitter';
import { Parser } from 'web-tree-sitter';

await Parser.init();

export type Position = {
  line: number;
  column: number;
};

export type PolicyFormat = 'standard' | 'hcl-block';

export type CursorContext = {
  keys: string[];
  role: 'key' | 'value';
  partial: string;
  value: string;
  policyFormat: PolicyFormat;
};

export type StatementContext = {
  Sid?: string;
  Effect?: string;
  Action?: string[];
  NotAction?: string[];
  Resource?: string[];
  NotResource?: string[];
  Principal?: Record<string, string[]> | string;
  NotPrincipal?: Record<string, string[]> | string;
  Condition?: Record<string, Record<string, string[]>>;
};

export class TreeBase {
  #trees = new Map<string, Tree>();
  #parser: Parser;

  constructor(language: Language) {
    this.#parser = new Parser();
    this.#parser.setLanguage(language);
  }

  getTree(uri: string) {
    return this.#trees.get(uri);
  }

  openDocument(uri: string, content: string) {
    this.#parse(uri, content);
  }

  updateDocument(uri: string, content: string) {
    this.#parse(uri, content);
  }

  closeDocument(uri: string) {
    this.#trees.get(uri)?.delete();
    this.#trees.delete(uri);
  }

  #parse(uri: string, content: string) {
    const tree = this.#parser.parse(content);
    if (!tree) return;

    const existing = this.#trees.get(uri);
    existing?.delete();

    this.#trees.set(uri, tree);
  }

  getNodeAtPosition(uri: string, position: Position) {
    const tree = this.getTree(uri);
    if (!tree) return null;

    const node = tree.rootNode.descendantForPosition({
      row: position.line,
      column: position.column,
    });
    return node;
  }

  getCursorContext(_uri: string, _position: Position): CursorContext | null {
    throw new Error('getCursorContext must be implemented by a subclass');
  }

  getStatementContext(_uri: string, _position: Position): StatementContext | null {
    throw new Error('getStatementContext must be implemented by a subclass');
  }

  getSiblingKeys(_uri: string, _position: Position): string[] {
    throw new Error('getSiblingKeys must be implemented by a subclass');
  }
}
