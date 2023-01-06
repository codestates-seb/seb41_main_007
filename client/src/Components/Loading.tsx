import './Styles/Loading.css';

export default function Loading({
  width = 20,
  height = 20,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div className={'loader'}>
      <svg className={'circular'} viewBox="25 25 50 50">
        <circle
          className={'path'}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="#bcbcbc"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
}
