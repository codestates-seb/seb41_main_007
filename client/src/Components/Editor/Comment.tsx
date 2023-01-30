import styles from './Styles/Comment.module.css';
import classNames from 'classnames/bind';

import { useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';

import { Editable, Slate, withReact } from 'slate-react';
import { createEditor, Text, Transforms, Editor } from 'slate';
import { withHistory } from 'slate-history';

import { Leaf, Element } from './comment_components';
import { Descendant } from '../../Types/slate';

const cx = classNames.bind(styles);

interface IProps {
  value: Descendant[];
  setValue: (value: Descendant[]) => void;
}

interface Ref {
  reset: () => void;
}

const RichText = forwardRef<Ref, IProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    reset() {
      Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
      });
    },
  }));
  const { value, setValue } = props;
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const decorate = useCallback(([node, path]: any) => {
    const ranges: any = [];
    if (!Text.isText(node)) {
      return ranges;
    }

    const match = node.text.match(
      /(http(s)?:\/\/)[\w-@:%._\+~#="'<>,?\/\[\]\{\}\(\)\~\`!$\^&\*]{2,}/gi,
    );
    if (match) {
      for (let i = 0; i < match.length; i++) {
        const offset = node.text.indexOf(match[i]);
        ranges.push({
          link: true,
          anchor: {
            path,
            offset,
          },
          focus: {
            path,
            offset: offset + match[i].length,
          },
        });
      }
    }

    return ranges;
  }, []);
  const editor = useMemo(
    () => withMentions(withHistory(withReact(createEditor()))),
    [],
  );

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable
        className={cx('doc')}
        placeholder={'리뷰내용 쓰기'}
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        decorate={decorate}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        translate="no"
      ></Editable>
    </Slate>
  );
});

const withMentions = (editor: Editor) => {
  const { isInline, isVoid } = editor;
  editor.isInline = (element) => {
    return element.type === 'mention' ? true : isInline(element);
  };
  editor.isVoid = (element) => {
    return element.type === 'mention' ? true : isVoid(element);
  };
  return editor;
};

RichText.displayName = 'RichText';

export default RichText;
