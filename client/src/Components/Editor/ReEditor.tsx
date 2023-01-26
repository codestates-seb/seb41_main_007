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

import { Element, Leaf, Toolbar } from './re_components';
import {
  Bold,
  Strikethrough,
  Spoiler,
  Image as ImageIcon,
  Youtube,
} from './icons';

import YoutubeToolTip from './YoutubeToolTip';
import Tooltip from '../Common/Tooltip';

import {
  ImageElement,
  LinkElement,
  YoutubeElement,
  Descendant,
} from '../../Types/slate';

type MARK = 'bold' | 'strikethrough' | 'spoiler' | 'select';
type BLOCK =
  | 'paragraph'
  | 'heading'
  | 'numbered-list'
  | 'block-quote'
  | 'bulleted-list';
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
  if (file !== null) {
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

async function handlerMakeThumbnail(file: File) {
  const generateVideoThumbnail = (file: File) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const video = document.createElement('video');
      video.autoplay = true;
      video.muted = true;
      video.src = URL.createObjectURL(file);
      video.onloadeddata = () => {
        let ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        return resolve(canvas.toDataURL('image/png'));
      };
    });
  };
  const thumnail = await generateVideoThumbnail(file);
  return thumnail === 'data:,' ? null : thumnail;
}

const withFile = (editor: Editor) => {
  const { insertData, isVoid } = editor;
  editor.isVoid = (element) => {
    return element.type === 'video' ||
      element.type === 'image' ||
      element.type === 'audio'
      ? true
      : isVoid(element);
  };
  editor.insertData = (data) => {
    const { files } = data;
    if (files && files.length > 0 && files.length < 11) {
      for (const file of files as any) {
        const fileType = file.type.split('/');
        if (FILETYPE.includes(fileType[1])) {
          if (fileType[0] === 'image') {
            if (file.size <= 10000000) {
              handlerCompresstion(editor, file);
            } else {
              toast.error('画像サイズは10MB未満にする必要がおります');
            }
          } else {
            toast.error('');
          }
        } else {
          toast.error(
            '申し訳ありませんが、以下のファイルのみ受け付けます 画像(.png, .jpeg, .gif, .svg), 動画(.mp4, .mov), オーディオ(.mp3)',
          );
        }
      }
    } else if (files && files.length > 10) {
      toast.error('一度に11個以上のファイルをアップロードすることはできません');
    } else {
      insertData(data);
    }
  };
  return editor;
};

const withLink = (editor: Editor) => {
  const { insertData, insertText, isInline, isVoid } = editor;
  editor.isVoid = (element) => element.type === 'youtube' || isVoid(element);
  editor.isInline = (element) => element.type === 'link' || isInline(element);
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
      } else {
        const linkElement: LinkElement = {
          type: 'link',
          url: text,
          children: [{ text: text }],
        };
        Transforms.insertNodes(editor, linkElement);
      }
    } else {
      insertData(data);
    }
  };
  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      const linkElement: LinkElement = {
        type: 'link',
        url: text,
        children: [{ text: text }],
      };
      Transforms.insertNodes(editor, linkElement);
    } else {
      insertText(text);
    }
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
  Transforms.insertNodes(editor, image);
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
      <Tooltip arrow content="太字" delay={370}>
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
      <Tooltip arrow content="取り消し線" delay={370}>
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
      <Tooltip arrow content="ネタバレ" delay={370}>
        <Spoiler disabled={disabled} active={isMarkActive(editor, 'spoiler')} />
      </Tooltip>
    </button>
  );
}

function FileButton() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files.length < 11) {
      for (const file of files as any) {
        const fileType = file.type.split('/');
        if (FILETYPE.includes(fileType[1])) {
          if (fileType[0] === 'image') {
            if (file.size <= 10000000) {
              handlerCompresstion(editor, file);
            } else {
              toast.error('画像サイズは10MB未満にする必要がおります');
            }
          } else {
            toast.error('');
          }
        } else {
          toast.error(
            '申し訳ありませんが、以下のファイルのみ受け付けます 画像(.png, .jpeg, .gif, .svg), 動画(.mp4, .mov), オーディオ(.mp3)',
          );
        }
      }
    } else if (files && files.length > 10) {
      toast.error('一度に11個以上のファイルをアップロードすることはできません');
    }
    e.target.value = '';
  };
  return (
    <label className={styles.button}>
      <Tooltip arrow content="写真/動画" delay={370}>
        <ImageIcon disabled={disabled} />
      </Tooltip>
      <input
        disabled={disabled}
        type="file"
        accept="image/svg+xml, image/jpeg, image/png, image/gif, video/quicktime, video/mp4, capture=carmera"
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
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        open();
      }}
    >
      <Tooltip arrow content="youtube" delay={370}>
        <Youtube disabled={disabled} />
      </Tooltip>
    </button>
  );
}
function Wall() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  return <span className={cx('wall', { wall_disabled: disabled })}></span>;
}
