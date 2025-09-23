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
  backgroundClass?: string;

  // Default & Hero variant props
  small?: boolean;
  description?: string;
  info?: string;

  // Post variants props
  date?: string;
  author?: Author;
  categories?: Category[];
}
