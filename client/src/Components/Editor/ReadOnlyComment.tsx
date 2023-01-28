import { useCallback } from 'react';
import { SlateReactPresentation } from 'slate-react-presentation';

import { ReadOnlyLeaf, ReadOnlyElement } from './comment_components';

export default function ReadOnly({ data }: { data: any }) {
  const renderElement = useCallback(
    (props: any) => <ReadOnlyElement {...props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props: any) => <ReadOnlyLeaf {...props} />,
    [],
  );
  return (
    <SlateReactPresentation
      value={data}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
    />
  );
}
