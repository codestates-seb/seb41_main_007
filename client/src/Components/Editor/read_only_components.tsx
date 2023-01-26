import styles from './Styles/components.module.css';
import classNames from 'classnames/bind';

import { YoutubePlayer } from './reactPlayer';

import { Element as CustomElement, Text } from 'slate';

const cx = classNames.bind(styles);
interface ElementProps {
  attributes: any;
  children: JSX.Element;
  element: CustomElement;
  setDisable: (boolean: boolean) => void;
  disable: boolean;
}
interface LeafProps {
  attributes: any;
  children: JSX.Element;
  leaf: Text;
}

export function ReadOnlyElement({
  attributes,
  children,
  element,
}: ElementProps) {
  const props = { attributes, children, element };
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'heading':
      return <h1 {...attributes}>{children}</h1>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'image':
      return <ReadOnlyImageElement {...props} />;
    case 'link':
      return <ReadOnlyLinkElement {...props} />;
    case 'youtube':
      return <ReadOnlyYoutubeElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
}

export function ReadOnlyLeaf({ attributes, children, leaf }: LeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }
  return <span {...attributes}>{children}</span>;
}

export function ReadOnlyImageElement({ attributes, children, element }: any) {
  return (
    <div
      {...attributes}
      contentEditable={false}
      className={cx('image_container_readonly')}
    >
      {children}
      <figure className={styles.image_wrapper} contentEditable={false}>
        <div className={styles.image_readonly}>
          <img
            src={element.url}
            alt=""
            width={element.width}
            height={element.height}
          />
        </div>
      </figure>
    </div>
  );
}

export function ReadOnlyYoutubeElement({ attributes, children, element }: any) {
  return (
    <div
      {...attributes}
      draggable={true}
      contentEditable={false}
      className={cx('video_container_readonly')}
    >
      {children}
      <YoutubePlayer url={element.url} />
    </div>
  );
}

export function ReadOnlyLinkElement({ attributes, children, element }: any) {
  return (
    <span style={{ color: '#1155cc' }}>
      <a
        {...attributes}
        href={element.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />
      </a>
    </span>
  );
}

const InlineChromiumBugfix = () => (
  <span contentEditable={false} style={{ fontSize: 0 }}>
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);
