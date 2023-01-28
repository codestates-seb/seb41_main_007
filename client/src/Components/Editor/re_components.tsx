import styles from './Styles/components.module.css';
import classNames from 'classnames/bind';

import { Transforms, Element as CustomElement, Text } from 'slate';
import {
  ReactEditor,
  useSlateStatic,
  useFocused,
  useSelected,
} from 'slate-react';

import Tooltip from '../Common/Tooltip';
import { Delete, EnterArrow } from './icons';
import { YoutubePlayer } from './reactPlayer';

const cx = classNames.bind(styles);

export interface PlayerProps {
  url: string;
}
export interface VideoPlayerProps {
  url: string;
  thumnail: string;
}
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

export function Element({ attributes, children, element }: ElementProps) {
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
      return <ImageElement {...props} />;
    case 'link':
      return <LinkElement {...props} />;
    case 'youtube':
      return <YoutubeElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
}

export function Leaf({ attributes, children, leaf }: LeafProps) {
  if (leaf.spoiler) {
    children = <Spoiler>{children}</Spoiler>;
  }
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }
  if (leaf.select) {
    return (
      <span style={{ backgroundColor: '#b4d5ff' }} {...attributes}>
        {children}
      </span>
    );
  }
  return <span {...attributes}>{children}</span>;
}

export function Spoiler({ children }: { children: JSX.Element }) {
  return <span className={cx('spoil')}>{children}</span>;
}

export function ImageElement({ attributes, children, element }: any) {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div
      {...attributes}
      contentEditable={false}
      className={cx('image_container', {
        image_container_true: selected && focused,
      })}
    >
      {children}
      <figure className={styles.image_wrapper} contentEditable={false}>
        <img
          src={element.url}
          style={{
            display: 'block',
            maxWidth: '100%',
          }}
          className={cx('image', {
            image_true: selected && focused,
          })}
          alt=""
        />
        <div className={styles.button_container}>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              const path = ReactEditor.findPath(editor, element);
              if (path[0]) {
                Transforms.removeNodes(editor, { at: path });
              } else {
                Transforms.removeNodes(editor, { at: path });
                Transforms.insertNodes(editor, {
                  type: 'paragraph',
                  children: [{ text: '' }],
                });
              }
            }}
            className={cx('delete_button', {
              button_true: selected && focused,
            })}
          >
            <Tooltip content="消去" delay={100}>
              <Delete />
            </Tooltip>
          </button>
          <button
            className={cx('line_button', 'upper_line_button', {
              button_true: selected && focused,
            })}
            onMouseDown={(e) => {
              e.preventDefault();
              const path = ReactEditor.findPath(editor, element);
              Transforms.insertNodes(
                editor,
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
                { at: path, select: true },
              );
            }}
          >
            <EnterArrow />
          </button>
          <button
            className={cx('line_button', 'lower_line_button', {
              button_true: selected && focused,
            })}
            onMouseDown={(e) => {
              e.preventDefault();
              const path = ReactEditor.findPath(editor, element);
              Transforms.insertNodes(
                editor,
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
                {
                  at: [path[0] + 1],
                  select: true,
                },
              );
            }}
            onMouseUp={(e) => {
              e.preventDefault();
              const path = ReactEditor.findPath(editor, element);
              setTimeout(() => Transforms.select(editor, [path[0] + 1]));
            }}
          >
            <EnterArrow />
          </button>
        </div>
      </figure>
    </div>
  );
}

export function YoutubeElement({ attributes, children, element }: any) {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div
      {...attributes}
      draggable={true}
      contentEditable={false}
      className={cx('video_container', { video_true: selected && focused })}
    >
      {children}
      <YoutubePlayer url={element.url} />
      <div className={styles.button_container}>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            const path = ReactEditor.findPath(editor, element);
            if (path[0]) {
              Transforms.removeNodes(editor, { at: path });
            } else {
              Transforms.removeNodes(editor, { at: path });
              Transforms.insertNodes(editor, {
                type: 'paragraph',
                children: [{ text: '' }],
              });
            }
          }}
          className={cx('delete_button', {
            button_true: selected && focused,
          })}
        >
          <Tooltip content="消去" delay={100}>
            <Delete />
          </Tooltip>
        </button>
        <button
          className={cx('line_button', 'upper_line_button', {
            button_true: selected && focused,
          })}
          onMouseDown={(e) => {
            e.preventDefault();
            const path = ReactEditor.findPath(editor, element);
            Transforms.insertNodes(
              editor,
              {
                type: 'paragraph',
                children: [{ text: '' }],
              },
              { at: path, select: true },
            );
          }}
        >
          <EnterArrow />
        </button>
        <button
          className={cx('line_button', 'lower_line_button', {
            button_true: selected && focused,
          })}
          onMouseDown={(e) => {
            e.preventDefault();
            const path = ReactEditor.findPath(editor, element);
            Transforms.insertNodes(
              editor,
              {
                type: 'paragraph',
                children: [{ text: '' }],
              },
              {
                at: [path[0] + 1],
                select: true,
              },
            );
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            const path = ReactEditor.findPath(editor, element);
            ReactEditor.focus(editor);
            Transforms.select(editor, [path[0] + 1]);
          }}
        >
          <EnterArrow />
        </button>
      </div>
    </div>
  );
}

export function LinkElement({ attributes, children, element }: any) {
  return (
    <span>
      <a {...attributes} href={element.url}>
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

export function Toolbar({ children }: { children: JSX.Element[] }) {
  return <div className={cx('toolbar')}>{children}</div>;
}
