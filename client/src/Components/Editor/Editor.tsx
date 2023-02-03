import styles from './Styles/Editor.module.css';
import classNames from 'classnames/bind';

import { useCallback, useMemo, useState, useRef } from 'react';

import { Editable, withReact, Slate } from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Range,
  Element as SlateElement,
} from 'slate';
import { withHistory } from 'slate-history';
import isUrl from 'is-url';
import { toast } from 'react-toastify';

import { Element, Leaf, Toolbar } from './components';

import YoutubeToolTip from './YoutubeToolTip';

import { ImageElement, YoutubeElement, Descendant } from '../../Types/slate';
import {
  BoldButton,
  FileButton,
  SpoilerButton,
  StrikethroughButton,
  Wall,
  YoutubeButton,
} from './Button/EditorButton';
import { compressImage } from 'Utils/commpressImage';

type BLOCK = 'paragraph' | 'heading' | 'block-quote';

const BLOCK = ['heading', 'block-quote'];
const VOIDELEMENT = ['image'];
const FILETYPE = ['jpeg', 'gif', 'svg+xml', 'png', 'quicktime', 'webp'];

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

  const editorPosition = () => {
    const el = editorRef.current;
    if (!el) return null;
    const rect = el!.getBoundingClientRect();
    return { top: rect.top, left: rect.left };
  };

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
                        !Editor.isEditor(n) && SlateElement.isElement(n),
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

export async function handlerCompresstion(editor: Editor, file: File) {
  if (file) {
    const res = await compressImage(file);
    const formData = new FormData();
    formData.append('file', res);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/file/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(async (data: any) => {
        const { imageUrls } = await data.json();
        const reader = new FileReader();
        reader.onload = function (e: any) {
          const url = e.target.result;
          const img = new Image();
          img.onload = function () {
            const width = img.width;
            const height = img.height;
            if (width < 200) {
              insertImage(
                editor,
                imageUrls,
                200,
                Math.floor(height * (200 / width)),
              );
            } else {
              insertImage(editor, imageUrls, width, height);
            }
          };
          img.src = url;
        };
        reader.readAsDataURL(file);
      })
      .catch((e) => {
        console.info(e);
      });
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
