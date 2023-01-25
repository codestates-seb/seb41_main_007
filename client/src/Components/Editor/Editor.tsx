import styles from './Styles/Editor.module.css';
import classNames from 'classnames/bind';

import { useCallback, useMemo, useState, useRef, ChangeEvent } from 'react';

import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react';
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
  Heading,
  Quote,
  BulletedList,
  NumberedList,
  Link,
  Image as ImageIcon,
  Youtube,
  Audio,
} from './icons';
import LinkToolTip from './LinkToolTip';
import YoutubeToolTip from './YoutubeToolTip';
import Tooltip from '../Common/Tooltip';

import {
  ImageElement,
  VideoElement,
  AudioElement,
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
  const openToolTip = () => {
    Editor.addMark(editor, 'select', true);
    setIsOpen(true);
  };
  const closeToolTip = () => {
    setIsOpen(false);
  };
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
        <LinkToolTip
          isOpen={isOpen}
          open={openToolTip}
          close={closeToolTip}
          editorPosition={editorPosition}
        />
        <YoutubeToolTip
          close={closeYotubeToolTip}
          isOpen={isOpenYoutube}
          editorPosition={editorPosition}
        />
        <Toolbar>
          <BoldButton />
          <StrikethroughButton />
          <SpoilerButton />
          <LinkButton open={openToolTip} />
          <Wall />
          <HeadingButton />
          <BlockQuoteButton />
          <BulletedListButton />
          <NumberedListButton />
          <Wall />
          <FileButton />
          <AudioButton />
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

async function handlerMakeThumbnail(file: File) {
  const generateVideoThumbnail = async (file: File) => {
    return new Promise(async (resolve) => {
      const canvas = document.createElement('canvas');
      const video = document.createElement('video');
      video.autoplay = true;
      video.muted = true;
      video.src = URL.createObjectURL(file);
      video.onloadeddata = async () => {
        let ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        canvas.toBlob(
          async function (data: any) {
            // 여기서 이미지 보냈다가 받아옴
            // const res = await videoImage(data);
            // return resolve(res);
          },
          'image/webp',
          0.95,
        );
      };
    });
  };
  const data = await generateVideoThumbnail(file);
  return data === 'data:,' ? null : data;
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
          } else if (fileType[0] === 'video') {
            if (file.size <= 20000000) {
              handlerMakeThumbnail(file).then((value) => {
                if (value) {
                  const reader = new FileReader();
                  reader.onload = async function (e: any) {
                    const url = e.target.result;
                    insertVideo(editor, url, value as string);
                  };
                  reader.readAsDataURL(file);
                } else {
                  toast.error('この動画ファイルはアップロードできません');
                }
              });
            } else {
              toast.error('動画サイズは20MB未満にする必要がおります');
            }
          } else if (file.type.split('/')[0] === 'audio') {
            if (file.size <= 10000000) {
              const reader = new FileReader();
              reader.onload = function (e: any) {
                const url = e.target.result;
                insertAudio(editor, url);
              };
              reader.readAsDataURL(file);
            } else {
              toast.error('オーディオは10MB未満にする必要がおります');
            }
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
  Transforms.insertNodes(editor, image, { mode: 'highest' });
};

const insertVideo = (editor: Editor, url: string, thumnail: string) => {
  const text = { text: '' };
  const video: VideoElement = {
    type: 'video',
    url,
    thumnail: thumnail,
    children: [text],
  };
  Transforms.insertNodes(editor, video, { mode: 'highest' });
};

const insertAudio = (editor: Editor, url: string) => {
  const text = { text: '' };
  const audio: AudioElement = { type: 'audio', url, children: [text] };
  Transforms.insertNodes(editor, audio, { mode: 'highest' });
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

function toggleBlock(editor: Editor, format: BLOCK) {
  const isActive = isBlockActive(editor, format);
  const isList = LIST.includes(format);
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && LIST.includes(n.type),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);
  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
}

function isBlockActive(editor: Editor, format: BLOCK) {
  const { selection } = editor;
  if (!selection) return false;
  const [match]: any = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });
  return !!match;
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
function LinkButton({ open }: { open: () => void }) {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  const disabledHeading = isBlockActive(editor, 'heading');
  const disabledNumberedList = isBlockActive(editor, 'numbered-list');
  const disabledBulletedList = isBlockActive(editor, 'bulleted-list');
  const disabledBlockQuote = isBlockActive(editor, 'block-quote');
  function beforeOpen() {
    if (editor.selection && Range.isCollapsed(editor.selection)) {
      const [match]: any = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
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
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
      });
      if (!!match) {
        ReactEditor.focus(editor);
        Transforms.select(editor, {
          anchor: Editor.start(editor, match[1]),
          focus: Editor.end(editor, match[1]),
        });
        Editor.addMark(editor, 'select', true);
      } else if (!!linkMatch) {
        const beforeNode: any = Editor.node(
          editor,
          Editor.before(editor, editor.selection)
            ? (Editor.before(editor, editor.selection) as Point)
            : editor.selection,
          { depth: 2 },
        );
        const afterNode: any = Editor.node(
          editor,
          Editor.after(editor, editor.selection)
            ? (Editor.after(editor, editor.selection) as Point)
            : editor.selection,
          { depth: 2 },
        );
        if (beforeNode && !!beforeNode[0].url) {
          ReactEditor.focus(editor);
          Transforms.select(editor, {
            anchor: Editor.start(editor, beforeNode[1]),
            focus: Editor.end(editor, beforeNode[1]),
          });
          Editor.addMark(editor, 'select', true);
        }
        if (afterNode && !!afterNode[0].url) {
          ReactEditor.focus(editor);
          Transforms.select(editor, {
            anchor: Editor.start(editor, afterNode[1]),
            focus: Editor.end(editor, afterNode[1]),
          });
          Editor.addMark(editor, 'select', true);
        }
      }
    } else {
      Editor.addMark(editor, 'select', true);
    }
  }
  function multiLine() {
    if (editor.selection && !Range.isCollapsed(editor.selection)) {
      if (editor.selection.anchor.path[0] !== editor.selection.focus.path[0]) {
        return true;
      }
    }
    return false;
  }
  return (
    <button
      className={styles.button}
      disabled={
        disabled ||
        multiLine() ||
        disabledBlockQuote ||
        disabledBulletedList ||
        disabledNumberedList ||
        disabledHeading
      }
      onClick={(e) => {
        e.preventDefault();
        beforeOpen();
        open();
      }}
    >
      <Tooltip arrow content="リンク" delay={370}>
        <Link
          disabled={
            disabled ||
            multiLine() ||
            disabledBlockQuote ||
            disabledBulletedList ||
            disabledNumberedList ||
            disabledHeading
          }
        />
      </Tooltip>
    </button>
  );
}
function HeadingButton() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, 'heading');
      }}
    >
      <Tooltip arrow content="見出し" delay={370}>
        <Heading
          disabled={disabled}
          active={isBlockActive(editor, 'heading')}
        />
      </Tooltip>
    </button>
  );
}
function BlockQuoteButton() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, 'block-quote');
      }}
    >
      <Tooltip arrow content="引用" delay={370}>
        <Quote
          disabled={disabled}
          active={isBlockActive(editor, 'block-quote')}
        />
      </Tooltip>
    </button>
  );
}
function BulletedListButton() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, 'bulleted-list');
      }}
    >
      <Tooltip arrow content="箇条書きリスト" delay={370}>
        <BulletedList
          disabled={disabled}
          active={isBlockActive(editor, 'bulleted-list')}
        />
      </Tooltip>
    </button>
  );
}
function NumberedListButton() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, 'numbered-list');
      }}
    >
      <Tooltip arrow content="番号付きリスト" delay={370}>
        <NumberedList
          disabled={disabled}
          active={isBlockActive(editor, 'numbered-list')}
        />
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
            if (file.size <= 10000000) {
              handlerCompresstion(editor, file);
            } else {
              toast.error('画像サイズは10MB未満にする必要がおります');
            }
          } else if (fileType[0] === 'video') {
            if (file.size <= 20000000) {
              handlerMakeThumbnail(file).then((value) => {
                if (value) {
                  const reader = new FileReader();
                  reader.onload = async function (e: any) {
                    const url = e.target.result;
                    insertVideo(editor, url, value as string);
                  };
                  reader.readAsDataURL(file);
                } else {
                  toast.error('この動画ファイルはアップロードできません');
                }
              });
            } else {
              toast.error('動画サイズは20MB未満にする必要がおります');
            }
          } else if (file.type.split('/')[0] === 'audio') {
            if (file.size <= 10000000) {
              const reader = new FileReader();
              reader.onload = function (e: any) {
                const url = e.target.result;
                insertAudio(editor, url);
              };
              reader.readAsDataURL(file);
            } else {
              toast.error('オーディオサイズは10MB未満にする必要がおります');
            }
          }
        } else {
          toast.error(
            '申し訳ありませんが、以下のファイルのみ受け付けます 画像(.png, .jpeg, .gif, .svg), 動画(.mp4, .mov), オーディオ(.mp3)',
          );
        }
      }
    } else if (files && files.length > 10) {
      toast.error(
        '一度に11個以上のファイルをアップロードすることはできません ',
      );
    }
    e.target.value = '';
  };
  return (
    <label className={styles.button}>
      <Tooltip arrow content="写真/動画" delay={370}>
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
function AudioButton() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  const disabled2 = isListActive(editor);
  return (
    <label className={styles.button}>
      <Tooltip arrow content="オーディオ" delay={370}>
        <Audio disabled={disabled || disabled2} />
      </Tooltip>
      <input
        disabled={disabled || disabled2}
        type="file"
        accept="audio/mp3"
        multiple
        style={{ display: 'none' }}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onChange={(e) => {
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
                } else if (fileType[0] === 'video') {
                  if (file.size <= 20000000) {
                    handlerMakeThumbnail(file).then((value) => {
                      if (value) {
                        const reader = new FileReader();
                        reader.onload = async function (e: any) {
                          const url = e.target.result;
                          insertVideo(editor, url, value as string);
                        };
                        reader.readAsDataURL(file);
                      } else {
                        toast.error('この動画ファイルはアップロードできません');
                      }
                    });
                  } else {
                    toast.error('動画サイズは20MB未満にする必要がおります');
                  }
                } else if (file.type.split('/')[0] === 'audio') {
                  if (file.size <= 10000000) {
                    const reader = new FileReader();
                    reader.onload = function (e: any) {
                      const url = e.target.result;
                      insertAudio(editor, url);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    toast.error('オーディオは20MB未満にする必要がおります');
                  }
                }
              } else {
                toast.error(
                  '申し訳ありませんが、以下のファイルのみ受け付けます 画像(.png, .jpeg, .gif, .svg), 動画(.mp4, .mov), オーディオ(.mp3)',
                );
              }
            }
          } else if (files && files.length > 10) {
            toast.error(
              '一度に11個以上のファイルをアップロードすることはできません',
            );
          }
          e.target.value = '';
        }}
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
      <Tooltip arrow content="youtube" delay={370}>
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
