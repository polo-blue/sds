// types.ts
export interface Author {
  firstName?: string;
  name: string;
}

export interface Category {
  name: string;
  uri: string;
}

export interface Props {
  // Common props
  variant?: 'default' | 'hero' | 'post' | 'post-split';
  title?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClass?: string;
  backgroundClass?: string;
  slim?: boolean;
  lang?: string;
  class?: string;

  // Default & Hero variant props
  description?: string;
  info?: string;

  // Post variants props
  date?: string;
  author?: Author;
  categories?: Category[];

  // Post Split variant props
  fullWidth?: boolean;
  align?: 'left' | 'center' | 'right';
  split?: 'equal' | 'wide';
}
