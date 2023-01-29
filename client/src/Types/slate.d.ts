import { ReactEditor } from 'slate-react';

export type Descendant = Element | Text | any;

export type ParagraphElement = { type: 'paragraph'; children: Descendant[] };
export type HeadingElement = { type: 'heading'; children: Descendant[] };
export type BlockQuoteElement = { type: 'block-quote'; children: Descendant[] };
export type BulletedListElement = {
  type: 'bulleted-list';
  children: Descendant[];
};
export type NumberedListElement = {
  type: 'numbered-list';
  children: Descendant[];
};
export type ListItemElement = { type: 'list-item'; children: Descendant[] };
export type LinkElement = {
  type: 'link';
  url: string;
  children: Descendant[];
};
export type ImageElement = {
  type: 'image';
  url: string;
  width: number;
  height: number;
  children: EmptyText[];
};
export type VideoElement = {
  type: 'video';
  url: string;
  thumnail: string;
  children: EmptyText[];
};
export type AudioElement = {
  type: 'audio';
  url: string;
  children: EmptyText[];
};
export type YoutubeElement = {
  type: 'youtube';
  url: string;
  children: EmptyText[];
};
export type MentionElement = {
  type: 'mention';
  character: string;
  children: EmptyText[];
};

type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BlockQuoteElement
  | BulletedListElement
  | ListItemElement
  | NumberedListElement
  | LinkElement
  | ImageElement
  | VideoElement
  | AudioElement
  | YoutubeElement
  | MentionElement;

type CustomText = {
  text: string;
  bold?: boolean;
  strikethrough?: boolean;
  spoiler?: boolean;
  select?: boolean;
  link?: boolean;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
