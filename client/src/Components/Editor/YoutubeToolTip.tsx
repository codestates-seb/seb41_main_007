import styles from './Styles/YoutubeToolTip.module.css';
import classNames from 'classnames/bind';

import { useState, useRef, useEffect } from 'react';

import { useSlate, ReactEditor } from 'slate-react';
import { Editor, Transforms } from 'slate';

import { YoutubeElement } from '../../Types/slate';

type BLOCK =
  | 'paragraph'
  | 'heading'
  | 'numbered-list'
  | 'block-quote'
  | 'bulleted-list';

const YOUTUBEREG =
  /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const cx = classNames.bind(styles);
export default function YoutubeToolTip({
  close,
  isOpen,
  editorPosition,
}: {
  close: () => void;
  isOpen: boolean;
  editorPosition: () => { top: number; left: number } | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const containerRect = editorPosition();
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
    const additionalPosition = blockPosition(blocktype[0].type);
    if (ReactEditor.isFocused(editor)) {
      const domSelection = window.getSelection();
      const domRange = domSelection?.getRangeAt(0);
      const domRect = domRange?.getBoundingClientRect();
      el.style.top = `${
        domRect!.top - containerRect!.top + additionalPosition + 31
      }px`;
      el.style.left = `${domRect!.left - containerRect!.left - 17}px`;
    }
  });
  if (isOpen)
    return (
      <div className={styles.tooltip} ref={ref}>
        <div className={styles.arrow}></div>
        <div className={styles.arrow_shadow}></div>
        <ToolTip close={close} />
      </div>
    );
  return <div ref={ref}></div>;
}

function ToolTip({ close }: { close: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const editor = useSlate();
  const [youtubeLink, setYoutubeLink] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
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
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useOutsideClicker(ref);
  function insertLink() {
    const url: any = YOUTUBEREG.exec(youtubeLink);
    const youtubeElement: YoutubeElement = {
      type: 'youtube',
      url: url[1],
      children: [{ text: '' }],
    };
    Transforms.insertNodes(editor, youtubeElement);
  }
  function handlerSubmit() {
    if (!!String(youtubeLink).match(YOUTUBEREG)) {
      insertLink();
      close();
    } else {
      inputRef.current?.focus();
      setError(true);
    }
  }
  function handlerKeyDown(key: string) {
    if (key === 'Enter') {
      handlerSubmit();
    }
  }
  return (
    <div ref={ref}>
      <div className={styles.input_wrapper}>
        <input
          className={styles.input}
          ref={inputRef}
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          onKeyDown={(e) => handlerKeyDown(e.key)}
        />
        <div className={styles.label}>Youtubeリンク</div>
      </div>
      <div className={cx('error', { error_true: error })}>
        Youtube링크가 아닙니다.
      </div>
      <button
        className={styles.input_button}
        onMouseDown={(e) => {
          e.preventDefault();
          handlerSubmit();
        }}
      >
        적용하기
      </button>
    </div>
  );
}
