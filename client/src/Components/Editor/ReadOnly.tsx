import { useCallback } from 'react';
import { SlateReactPresentation } from 'slate-react-presentation';

import { ReadOnlyElement, ReadOnlyLeaf } from './read_only_components';

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
