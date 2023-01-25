import styles from './Styles/comment_components.module.css';

import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

import { Text, Element as CustomElement } from 'slate';
import { useSelected, useFocused } from 'slate-react';

interface LeafProps {
  attributes: any;
  children: JSX.Element;
  leaf: Text;
}
interface ElementProps {
  attributes: any;
  children: JSX.Element;
  element: CustomElement;
}

export function Leaf({ attributes, children, leaf }: LeafProps) {
  if (leaf.link) {
    return (
      <span>
        <a {...attributes}>{children}</a>
      </span>
    );
  }
  return <span {...attributes}>{children}</span>;
}

export function Element({ attributes, children, element }: ElementProps) {
  const props = { attributes, children, element };
  if (element.type === 'mention') {
    return <Mention {...props} />;
  }
  return (
    <div style={style} {...attributes}>
      {children}
    </div>
  );
}

export function ReadOnlyLeaf({ attributes, children, leaf }: LeafProps) {
  if (leaf.link) {
    return (
      <span>
        <a
          href={leaf.text}
          target="_blank"
          rel="noopener noreferrer"
          {...attributes}
        >
          {children}
        </a>
      </span>
    );
  }
  return <span {...attributes}>{children}</span>;
}

export function ReadOnlyElement({
  attributes,
  children,
  element,
}: ElementProps) {
  const props = { attributes, children, element };
  if (element.type === 'mention') {
    return <ReadOnlyMention {...props} />;
  }
  return (
    <div style={style} {...attributes}>
      {children}
    </div>
  );
}

const style: CSSProperties = {
  fontSize: '14px',
  lineHeight: '18px',
};

const Mention = ({ attributes, children, element }: any) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span
      {...attributes}
      contentEditable={false}
      style={{
        padding: '1px 2px',
        margin: '0 2px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: 'var(--gray-10)',
        fontSize: 12,
        lineHeight: '18px',
        boxShadow: selected && focused ? 'inset 0 0 0 2px #B4D5FF' : 'none',
      }}
    >
      @{element.character}
      {children}
    </span>
  );
};

const ReadOnlyMention = ({ attributes, children, element }: any) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span
      {...attributes}
      contentEditable={false}
      style={{
        padding: '1px 2px',
        margin: '0 2px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: 'var(--gray-10)',
        fontSize: 12,
        lineHeight: '18px',
        boxShadow: selected && focused ? 'inset 0 0 0 2px #B4D5FF' : 'none',
      }}
    >
      {element.character !== '匿名' ? (
        <Link to={`/user/${element.character}`}>
          <div className={styles.mention}>
            @{element.character}
            {children}
          </div>
        </Link>
      ) : (
        <div className={styles.mention}>
          @{element.character}
          {children}
        </div>
      )}
    </span>
  );
};
