import React from 'react';

interface props {
  children: string;
}

export default function TinyTitle(props: props) {
  return (
    <div className="text-sm font-semibold mt-6 mb-3">{props.children}</div>
  );
}
