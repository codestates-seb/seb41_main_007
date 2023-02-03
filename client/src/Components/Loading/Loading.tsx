import styles from './Styles/Loading.module.css';

export default function Loading({
  width = 20,
  height = 20,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={styles.loader}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle
          className={styles.path}
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
