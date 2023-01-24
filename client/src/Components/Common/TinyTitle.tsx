interface props {
  children: string;
}

export default function TinyTitle(props: props) {
  return (
    <div className="text-sm font-semibold mt-6 mb-3">{props.children}</div>
  );
}

{
  /* <div className="font-semibold py-4 text-2xl mb-3"> 주문서</div>
<div className="text-sm font-semibold mt-6 mb-3">{props.children}</div> */
}
