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

