import styles from './Styles/Editor.module.css';
import classNames from 'classnames/bind';

import { useCallback, useMemo, useState, useRef, ChangeEvent } from 'react';

import { Editable, withReact, useSlate, Slate } from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Range,
  Element as SlateElement,
  Point,
} from 'slate';
import { withHistory } from 'slate-history';
import isUrl from 'is-url';
import { toast } from 'react-toastify';

import { Element, Leaf, Toolbar } from './components';
import {
  Bold,
  Strikethrough,
  Spoiler,
  Link,
  Image as ImageIcon,
  Youtube,
} from './icons';
import LinkToolTip from './LinkToolTip';
import YoutubeToolTip from './YoutubeToolTip';
import Tooltip from '../Common/Tooltip';

import {
  ImageElement,
  LinkElement,
  YoutubeElement,
  Descendant,
} from '../../Types/slate';

type MARK = 'bold' | 'strikethrough' | 'spoiler' | 'select';
type BLOCK = 'paragraph' | 'heading' | 'block-quote';

const LIST = ['bulleted-list', 'numbered-list'];
const BLOCK = ['heading', 'numbered-list', 'block-quote', 'bulleted-list'];
const VOIDELEMENT = ['image', 'video', 'audio'];
const FILETYPE = [
  'jpeg',
  'gif',
  'svg+xml',
  'png',
  'quicktime',
  'mp4',
  'mpeg',
  'webp',
];

const YOUTUBEREG =
  /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;
const cx = classNames.bind(styles);

interface IProps {
  value: Descendant[];
  setValue: (value: Descendant[]) => void;
}

export default function RichText({ value, setValue }: IProps) {
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withLink(withFile(withHistory(withReact(createEditor())))),
    [],
  );
  const editorRef = useRef<HTMLDivElement>(null);
  const [isOpenYoutube, setIsOpenYoutube] = useState<boolean>(false);
  const openYotubeToolTip = () => {
    Editor.addMark(editor, 'select', true);
    setIsOpenYoutube(true);
  };
  const closeYotubeToolTip = () => setIsOpenYoutube(false);
  function editorPosition() {
    const el = editorRef.current;
    if (!el) return null;
    const rect = el!.getBoundingClientRect();
    return { top: rect.top, left: rect.left };
  }
  return (
    <div
      className={styles.editor}
      ref={editorRef}
      style={{ position: 'relative' }}
    >
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <YoutubeToolTip
          close={closeYotubeToolTip}
          isOpen={isOpenYoutube}
          editorPosition={editorPosition}
        />
        <Toolbar>
          <BoldButton />
          <StrikethroughButton />
          <SpoilerButton />
          <Wall />
          <FileButton />
          <YoutubeButton open={openYotubeToolTip} />
        </Toolbar>
        <Editable
          className={cx('doc')}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(e) => {
            if (editor.selection && Range.isCollapsed(editor.selection)) {
              const [voidMatch]: any = Editor.nodes(editor, {
                match: (n) =>
                  !Editor.isEditor(n) &&
                  SlateElement.isElement(n) &&
                  VOIDELEMENT.includes(n.type),
              });
              if (!!voidMatch) {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  return Transforms.insertNodes(
                    editor,
                    {
                      type: 'paragraph',
                      children: [{ text: '' }],
                    },
                    {
                      at: [editor.selection.anchor.path[0] + 1],
                      select: true,
                    },
                  );
                }
                if (e.key === 'Delete' || e.key === 'Backspace') {
                  e.preventDefault();
                  return Transforms.removeNodes(editor, {
                    at: editor.selection,
                  });
                }
              }
              const [linkMatch]: any = Editor.nodes(editor, {
                match: (n) =>
                  !Editor.isEditor(n) &&
                  SlateElement.isElement(n) &&
                  n.type === 'link',
              });
              if (!!linkMatch) {
                if (linkMatch[0].children.length === 1) {
                  if (linkMatch[0].children[0].text.length === 1) {
                    if (e.key === 'Delete' || e.key === 'Backspace') {
                      e.preventDefault();
                      Transforms.removeNodes(editor, {
                        match: (n) =>
                          !Editor.isEditor(n) &&
                          SlateElement.isElement(n) &&
                          n.type === 'link',
                      });
                    }
                  }
                }
                if (e.key === 'Enter') {
                  const end = Editor.end(editor, linkMatch[1]);
                  const start = Editor.start(editor, linkMatch[1]);
                  if (
                    editor.selection.anchor.offset === end.offset ||
                    editor.selection.anchor.offset === start.offset
                  ) {
                    e.preventDefault();
                    Transforms.splitNodes(editor);
                    Transforms.select(editor, {
                      path: [start.path[0] + 1, 0],
                      offset: 0,
                    });
                  }
                }
              }
              const [blockMatch]: any = Editor.nodes(editor, {
                at: Editor.unhangRange(editor, editor.selection),
                match: (n) =>
                  !Editor.isEditor(n) &&
                  SlateElement.isElement(n) &&
                  BLOCK.includes(n.type),
              });
              if (!!blockMatch) {
                if (e.key === 'Enter' || e.key === 'Backspace') {
                  const textNode: any = Editor.node(editor, editor.selection);
                  if (blockMatch[0].type === 'heading') {
                    e.preventDefault();
                    return Transforms.insertNodes(editor, {
                      type: 'paragraph',
                      children: [{ text: '' }],
                    });
                  }
                  if (
                    textNode[0].text === '' &&
                    blockMatch[0].type !== 'heading'
                  ) {
                    e.preventDefault();
                    Transforms.unwrapNodes(editor, {
                      match: (n) =>
                        !Editor.isEditor(n) &&
                        SlateElement.isElement(n) &&
                        LIST.includes(n.type),
                      split: true,
                    });
                    const newProperties: Partial<SlateElement> = {
                      type: 'paragraph',
                    };
                    Transforms.setNodes<SlateElement>(editor, newProperties);
                  }
                }
              }
            }
          }}
          spellCheck={false}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          autoCapitalize="off"
          autoCorrect="off"
          translate="no"
        ></Editable>
      </Slate>
    </div>
  );
}

async function handlerCompresstion(editor: Editor, file: File) {
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e: any) {
      const url = e.target.result;
      const img = new Image();
      img.onload = function () {
        const width = img.width;
        const height = img.height;
        if (width < 200) {
          insertImage(editor, url, 200, Math.floor(height * (200 / width)));
        } else {
          insertImage(editor, url, width, height);
        }
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  }
}

const withFile = (editor: Editor) => {
  const { insertData, isVoid } = editor;
  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };
  editor.insertData = (data) => {
    const { files } = data;
    if (files && files.length > 0 && files.length < 11) {
      for (const file of files as any) {
        const fileType = file.type.split('/');
        if (FILETYPE.includes(fileType[1])) {
          if (fileType[0] === 'image') {
            if (file.size <= 50000000) {
              handlerCompresstion(editor, file);
            } else {
              toast.error('사진사이즈는 50MB 이하로 등록해주시길바랍니다');
            }
          } else if (fileType[0] === 'video') {
            toast.error('비디오는 불가능합니다');
          } else if (file.type.split('/')[0] === 'audio') {
            toast.error('오디오는 불가합니다');
          }
        } else {
          toast.error('지원하는 파일 형식에 맞지않습니다');
        }
      }
    } else if (files && files.length > 10) {
      toast.error('한번에 11개 이상에 파일은 등록하지 못합니다');
    } else {
      insertData(data);
    }
  };
  return editor;
};

const withLink = (editor: Editor) => {
  const { insertData, insertText, isVoid } = editor;
  editor.isVoid = (element) => element.type === 'youtube' || isVoid(element);
  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    if (text && isUrl(text)) {
      if (!!String(text).match(YOUTUBEREG)) {
        const match: any = YOUTUBEREG.exec(text);
        const youtubeElement: YoutubeElement = {
          type: 'youtube',
          url: match[1],
          children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, youtubeElement);
      }
    } else {
      insertData(data);
    }
  };
  editor.insertText = (text) => {
    insertText(text);
  };
  return editor;
};

const insertImage = (
  editor: Editor,
  url: string,
  width: number,
  height: number,
) => {
  const text = { text: '' };
  const image: ImageElement = {
    type: 'image',
    url,
    children: [text],
    width: width,
    height: height,
  };
  Transforms.insertNodes(editor, image, { mode: 'highest' });
};

function toggleMark(editor: Editor, format: MARK) {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

function isMarkActive(editor: Editor, format: MARK) {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}

function isVoidActive(editor: Editor) {
  const { selection } = editor;
  if (!selection) return false;
  const [match]: any = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      VOIDELEMENT.includes(n.type),
  });
  return !!match;
}

function isListActive(editor: Editor) {
  const { selection } = editor;
  if (!selection) return false;
  const [match]: any = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && LIST.includes(n.type),
  });
  return !!match;
}

function BoldButton() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, 'bold');
      }}
    >
      <Tooltip arrow content="굵게" delay={370}>
        <Bold disabled={disabled} active={isMarkActive(editor, 'bold')} />
      </Tooltip>
    </button>
  );
}

function StrikethroughButton() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, 'strikethrough');
      }}
    >
      <Tooltip arrow content="취소선" delay={370}>
        <Strikethrough
          disabled={disabled}
          active={isMarkActive(editor, 'strikethrough')}
        />
      </Tooltip>
    </button>
  );
}

function SpoilerButton() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, 'spoiler');
      }}
    >
      <Tooltip arrow content="스포일러" delay={370}>
        <Spoiler disabled={disabled} active={isMarkActive(editor, 'spoiler')} />
      </Tooltip>
    </button>
  );
}

function FileButton() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  const disabled2 = isListActive(editor);
  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files.length < 11) {
      for (const file of files as any) {
        const fileType = file.type.split('/');
        if (FILETYPE.includes(fileType[1])) {
          if (fileType[0] === 'image') {
            if (file.size <= 50000000) {
              handlerCompresstion(editor, file);
            } else {
              toast.error('사진사이즈는 50MB 이하로 등록해주시길바랍니다');
            }
          } else if (fileType[0] === 'video') {
            toast.error('비디오는 불가합니다');
          } else if (file.type.split('/')[0] === 'audio') {
            toast.error('오디오는 불가합니다');
          }
        } else {
          toast.error('지원하는 파일 형식에 맞지않습니다');
        }
      }
    } else if (files && files.length > 10) {
      toast.error('한번에 11개 이상에 파일은 등록하지 못합니다');
    }
    e.target.value = '';
  };
  return (
    <label className={styles.button}>
      <Tooltip arrow content="사진" delay={370}>
        <ImageIcon disabled={disabled || disabled2} />
      </Tooltip>
      <input
        disabled={disabled || disabled2}
        type="file"
        accept="image/svg+xml, image/jpeg, image/png, image/gif, video/quicktime, video/mp4,capture=carmera"
        multiple
        style={{ display: 'none' }}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onChange={handlerChange}
      />
    </label>
  );
}

function YoutubeButton({ open }: { open: () => void }) {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  const disabled2 = isListActive(editor);
  return (
    <button
      className={styles.button}
      disabled={disabled || disabled2}
      onClick={(e) => {
        e.preventDefault();
        open();
      }}
    >
      <Tooltip arrow content="유튜브" delay={370}>
        <Youtube disabled={disabled || disabled2} />
      </Tooltip>
    </button>
  );
}

function Wall() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  return <span className={cx('wall', { wall_disabled: disabled })}></span>;
}
