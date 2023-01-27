import styles from '../Styles/Editor.module.css';
import classNames from 'classnames/bind';
import { ChangeEvent } from 'react';
import { useSlate } from 'slate-react';
import { Editor, Element as SlateElement } from 'slate';
import { toast } from 'react-toastify';

import {
  Bold,
  Strikethrough,
  Spoiler,
  Image as ImageIcon,
  Youtube,
} from '../icons';
import Tooltip from '../../Common/Tooltip';
import { handlerCompresstion } from '../Editor';

type MARK = 'bold' | 'strikethrough' | 'spoiler' | 'select';

const VOIDELEMENT = ['image'];
const FILETYPE = ['jpeg', 'gif', 'svg+xml', 'png', 'quicktime', 'webp'];

const cx = classNames.bind(styles);

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

export function BoldButton() {
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

export function StrikethroughButton() {
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

export function SpoilerButton() {
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

export function FileButton() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
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
        <ImageIcon disabled={disabled} />
      </Tooltip>
      <input
        disabled={disabled}
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

export function YoutubeButton({ open }: { open: () => void }) {
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
      <Tooltip arrow content="유튜브" delay={370}>
        <Youtube disabled={disabled} />
      </Tooltip>
    </button>
  );
}

export function Wall() {
  const editor = useSlate();
  const disabled = isVoidActive(editor);
  return <span className={cx('wall', { wall_disabled: disabled })}></span>;
}
