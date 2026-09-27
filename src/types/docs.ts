export interface ComponentPropMetadata {
  name: string;
  type: string;
  /** Exact source expression; null means no default is declared. */
  defaultValue: string | null;
  required: boolean;
  /** Source documentation comment, or an empty string when undocumented. */
  description: string;
}

export interface ComponentSourceFile {
  /** Repository-relative path, preserving aliases and relative imports. */
  path: string;
  code: string;
  language: string;
}

export interface ComponentDocMetadata {
  componentName: string;
  sourcePath: string;
  props: ComponentPropMetadata[];
  /** External runtime packages; React is assumed to be installed. */
  dependencies: string[];
  /** Entry component plus its transitive local files and required companions. */
  files: ComponentSourceFile[];
}

export type ComponentDocsRegistry = Record<string, ComponentDocMetadata>;
