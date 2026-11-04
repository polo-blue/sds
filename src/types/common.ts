export interface Color {
  id: number;
  slug: string;
  name?: string;
}

export interface EngineType {
  id: number;
  type: string;
}

export interface Model {
  id: number;
  slug: string;
  sort: number;
  name: string;
}

export interface Material {
  id: number;
  name: string;
  slug: string;
  sort: number | null;
  value?: string | null;
}

export interface MaterialsObject {
  name: string;
  list: Material[];
}

export interface Position {
  id: number;
  slug: string;
  sort: number;
  name: string;
}

// HTML tags a component with an `as` prop can render as
export type ElementTag = 'th' | 'td' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
