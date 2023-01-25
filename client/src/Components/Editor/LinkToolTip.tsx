import styles from './Styles/LinkTooltip.module.css';
import classNames from 'classnames/bind';

import { useEffect, useRef, useState } from 'react';

import {
  Editor,
  Element,
  Transforms,
  Range,
  Point,
  Text,
  Node as SlateNode,
} from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { LinkElement } from '../../Types/slate';
import isUrl from 'is-url';

import { ChangeLink, DeleteLink } from './icons';
import Tooltip from '../Common/Tooltip';

type BLOCK =
  | 'paragraph'
  | 'heading'
  | 'numbered-list'
  | 'block-quote'
  | 'bulleted-list';

const VOIDELEMENT = ['image', 'video', 'audio'];
const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const cx = classNames.bind(styles);
export default function LinkToolTip({
  isOpen,
  open,
  close,
  editorPosition,
}: {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  editorPosition: () => { top: number; left: number } | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const containerRect = editorPosition();
  const { selection } = editor;
  const [match]: any = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
  const [isVoid]: any = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      VOIDELEMENT.includes(n.type),
  });
  function blockPosition(format: BLOCK) {
    if (format === 'heading') {
      return 16;
    }
    return 0;
  }
  useEffect(() => {
    const { selection } = editor;
    const el = ref.current;
    if (!el || !selection) {
      return;
    }
    const blocktype: any = Editor.node(editor, selection, { depth: 1 });
    const linkDepth = LIST_TYPES.includes(blocktype[0].type);
    const additionalPosition = blockPosition(blocktype[0].type);
    if (ReactEditor.isFocused(editor) && Range.isCollapsed(selection)) {
      if (!!match) {
        const node = Editor.node(editor, selection!, {
          depth: linkDepth ? 3 : 2,
        });
        const domNode = ReactEditor.toDOMNode(editor, node[0]);
        const domRect = domNode.getBoundingClientRect();
        el.style.top = `${
          domRect.top - containerRect!.top + additionalPosition + 31
        }px`;
        el.style.left = `${domRect.left - containerRect!.left - 17}px`;
      } else if (!!linkMatch) {
        const beforeNode: any = Editor.node(
          editor,
          Editor.before(editor, selection)
            ? (Editor.before(editor, selection) as Point)
            : selection,
          {
            depth: linkDepth ? 3 : 2,
          },
        );
        const afterNode: any = Editor.node(
          editor,
          Editor.after(editor, selection)
            ? (Editor.after(editor, selection) as Point)
            : selection,
          {
            depth: linkDepth ? 3 : 2,
          },
        );
        if (beforeNode && !!beforeNode[0].url) {
          const domNode = ReactEditor.toDOMNode(editor, beforeNode[0]);
          const domRect = domNode.getBoundingClientRect();
          el.style.top = `${
            domRect.top - containerRect!.top + additionalPosition + 31
          }px`;
          el.style.left = `${domRect.left - containerRect!.left - 17}px`;
        }
        if (afterNode && !!afterNode[0].url) {
          const domNode = ReactEditor.toDOMNode(editor, afterNode[0]);
          const domRect = domNode.getBoundingClientRect();
          el.style.top = `${
            domRect.top - containerRect!.top + additionalPosition + 31
          }px`;
          el.style.left = `${domRect.left - containerRect!.left - 17}px`;
        }
      } else {
        const domSelection = window.getSelection();
        const domRange = domSelection?.getRangeAt(0);
        const domRect = domRange?.getBoundingClientRect();
        el.style.top = `${
          domRect!.top - containerRect!.top + additionalPosition + 31
        }px`;
        el.style.left = `${domRect!.left - containerRect!.left - 17}px`;
      }
    } else if (ReactEditor.isFocused(editor) && !Range.isCollapsed(selection)) {
      const domSelection = window.getSelection();
      const domRange = domSelection?.getRangeAt(0);
      const domRect = domRange?.getBoundingClientRect();
      el.style.top = `${
        domRect!.top - containerRect!.top + additionalPosition + 31
      }px`;
      el.style.left = `${domRect!.left - containerRect!.left - 17}px`;
    }
  });
  if (!selection) return <div ref={ref}></div>;
  if (isOpen) {
    return (
      <div className={styles.full_tooltip} ref={ref}>
        <div className={styles.arrow}></div>
        <div className={styles.arrow_shadow}></div>
        <FullToolTip close={close} />
      </div>
    );
  }
  const [linkMatch]: any = Editor.nodes(editor, {
    at: {
      anchor: Editor.before(editor, selection)
        ? (Editor.before(editor, selection) as Point)
        : selection.anchor,
      focus: Editor.after(editor, selection)
        ? (Editor.after(editor, selection) as Point)
        : selection.focus,
    },
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
  if (
    ReactEditor.isFocused(editor) &&
    Range.isCollapsed(selection) &&
    !!linkMatch &&
    !isVoid
  ) {
    return (
      <div ref={ref}>
        <button
          onMouseDown={(e) => e.preventDefault()}
          className={styles.simple_tooltip}
        >
          <div className={styles.arrow}></div>
          <div className={styles.arrow_shadow}></div>
          <SimpleToolTip open={open} />
        </button>
      </div>
    );
  }
  return <div ref={ref}></div>;
}

function SimpleToolTip({ open }: { open: () => void }) {
  const editor = useSlate();
  const { selection } = editor;
  const blocktype: any = Editor.node(editor, selection!, { depth: 1 });
  const linkDepth = LIST_TYPES.includes(blocktype[0].type);
  const node: any = Editor.node(editor, selection!, {
    depth: linkDepth ? 3 : 2,
  });
  const beforeNode: any = Editor.node(
    editor,
    Editor.before(editor, selection!)
      ? (Editor.before(editor, selection!) as Point)
      : editor.selection!.anchor,
    {
      depth: linkDepth ? 3 : 2,
    },
  );
  const afterNode: any = Editor.node(
    editor,
    Editor.after(editor, selection!)
      ? (Editor.after(editor, selection!) as Point)
      : editor.selection!.focus,
    {
      depth: linkDepth ? 3 : 2,
    },
  );
  function url() {
    if (node && !!node[0].url) return node[0].url;
    if (beforeNode && !!beforeNode[0].url) return beforeNode[0].url;
    if (afterNode && !!afterNode[0].url) return afterNode[0].url;
    return 'it is bug-bug';
  }
  function beforeOpen() {
    if (editor.selection && Range.isCollapsed(editor.selection)) {
      const [match]: any = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
      });
      const [linkMatch]: any = Editor.nodes(editor, {
        at: {
          anchor: Editor.before(editor, editor.selection)
            ? (Editor.before(editor, editor.selection) as Point)
            : editor.selection.anchor,
          focus: Editor.after(editor, editor.selection)
            ? (Editor.after(editor, editor.selection) as Point)
            : editor.selection.focus,
        },
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
      });
      if (!!match) {
        ReactEditor.focus(editor);
        Transforms.select(editor, {
          anchor: Editor.start(editor, match[1]),
          focus: Editor.end(editor, match[1]),
        });
      } else if (!!linkMatch) {
        const beforeNode: any = Editor.node(
          editor,
          Editor.before(editor, editor.selection)
            ? (Editor.before(editor, editor.selection) as Point)
            : editor.selection,
          { depth: linkDepth ? 3 : 2 },
        );
        const afterNode: any = Editor.node(
          editor,
          Editor.after(editor, editor.selection)
            ? (Editor.after(editor, editor.selection) as Point)
            : editor.selection,
          { depth: linkDepth ? 3 : 2 },
        );
        if (beforeNode && !!beforeNode[0].url) {
          ReactEditor.focus(editor);
          Transforms.select(editor, {
            anchor: Editor.start(editor, beforeNode[1]),
            focus: Editor.end(editor, beforeNode[1]),
          });
        }
        if (afterNode && !!afterNode[0].url) {
          ReactEditor.focus(editor);
          Transforms.select(editor, {
            anchor: Editor.start(editor, afterNode[1]),
            focus: Editor.end(editor, afterNode[1]),
          });
        }
      }
    }
  }
  function deleteLink() {
    if (node && !!node[0].url)
      return Transforms.unwrapNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
      });
    if (beforeNode && !!beforeNode[0].url)
      return Transforms.unwrapNodes(editor, {
        at: {
          anchor: Editor.start(editor, beforeNode[1]),
          focus: Editor.end(editor, beforeNode[1]),
        },
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
      });
    if (afterNode && !!afterNode[0].url)
      return Transforms.unwrapNodes(editor, {
        at: {
          anchor: Editor.start(editor, afterNode[1]),
          focus: Editor.end(editor, afterNode[1]),
        },
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
      });
  }
  return (
    <>
      <span className={styles.link_box}>
        <a
          href={url()}
          target="_blank"
          rel="noopener noreferrer"
          onMouseDown={(e) => e.preventDefault()}
        >
          {url()}
        </a>
      </span>
      <button
        style={{ marginLeft: 10 }}
        className={styles.button}
        onClick={(e) => {
          e.preventDefault();
          beforeOpen();
          open();
        }}
      >
        <Tooltip arrow content="リンクを変更" delay={150}>
          <ChangeLink />
        </Tooltip>
      </button>
      <button
        className={styles.button}
        onClick={(e) => {
          e.preventDefault();
          deleteLink();
        }}
      >
        <Tooltip arrow content="リンクを削除" delay={150}>
          <DeleteLink />
        </Tooltip>
      </button>
    </>
  );
}

function FullToolTip({ close }: { close: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const editor = useSlate();
  const [text, setText] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const { selection } = editor;
  const blocktype: any = Editor.node(editor, selection!, { depth: 1 });
  const linkDepth = LIST_TYPES.includes(blocktype[0].type);
  function useOutsideClicker(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handlerClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          close();
        }
      }
      document.addEventListener('mousedown', handlerClickOutside);
      return () => {
        document.removeEventListener('mousedown', handlerClickOutside);
        Editor.removeMark(editor, 'select');
        Transforms.deselect(editor);
      };
    }, [ref]);
  }
  useOutsideClicker(ref);
  useEffect(() => {
    inputRef.current?.focus();
    if (!(selection && Range.isCollapsed(selection))) {
      const node: any = Editor.node(editor, selection!, {
        depth: linkDepth ? 3 : 2,
      });
      const selectionText = Editor.string(editor, selection!);
      const nodeText = SlateNode.string(node[0]);
      if (selectionText === nodeText) {
        const link = node[0].url;
        const text = Editor.string(editor, selection!);
        setText(text);
        setLink(link);
      } else {
        const text = Editor.string(editor, selection!);
        setText(text);
      }
    }
  }, [editor, selection, linkDepth]);
  useEffect(() => {
    const timeout = setTimeout(() => inputRef.current?.focus());
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  function insertLink() {
    const linkElement: LinkElement = {
      type: 'link',
      url: isUrl(link) ? link : 'https://' + link,
      children: [{ text: !!text ? text : link }],
    };
    if (!(selection && Range.isCollapsed(selection))) {
      const node: any = Editor.node(editor, selection!, { depth: 2 });
      const selectionText = Editor.string(editor, selection!);
      const nodeText = SlateNode.string(node[0]);
      if (selectionText === nodeText) {
        Transforms.removeNodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
        });
        Transforms.insertNodes(editor, linkElement);
      } else {
        Transforms.removeNodes(editor, {
          match: (n) => Text.isText(n) && n.select === true,
        });
        Transforms.insertNodes(editor, linkElement, {
          mode: 'highest',
        });
      }
    } else {
      Transforms.insertNodes(editor, linkElement);
    }
  }
  function handlerSubmit() {
    if (isUrl(link)) {
      insertLink();
      close();
    } else {
      const newLink = 'https://' + link;
      if (isUrl(newLink)) {
        insertLink();
        close();
      }
      inputRef.current?.focus();
      setError(true);
    }
  }
  function handlerKeyDown(e: any) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlerSubmit();
    }
  }
  return (
    <div ref={ref}>
      <div className={styles.input_wrapper}>
        <input
          className={styles.input}
          placeholder="(省略可)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handlerKeyDown}
        />
        <div className={styles.label_text}>文章</div>
      </div>
      <div style={{ marginTop: 3 }} className={styles.input_wrapper}>
        <input
          className={styles.input}
          value={link}
          ref={inputRef}
          onChange={(e) => {
            setError(false);
            setLink(e.target.value);
          }}
          onKeyDown={handlerKeyDown}
        />
        <div className={styles.label_link}>リンク</div>
      </div>
      <div className={cx('error', { error_true: error })}>
        リンクではありません
      </div>
      <button
        className={styles.input_button}
        onMouseDown={(e) => {
          e.preventDefault();
          handlerSubmit();
        }}
      >
        適用
      </button>
    </div>
  );
}
