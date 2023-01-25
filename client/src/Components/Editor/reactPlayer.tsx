import styles from './Styles/reactPlayer.module.css';

import ReactPlayer from 'react-player';

export interface PlayerProps {
  url: string;
}

export function VideoPlayer({ url }: PlayerProps) {
  return (
    <div className={styles.wrapper}>
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="100%"
        config={{ file: { attributes: { disablePictureInPicture: true } } }}
      />
    </div>
  );
}

export function AudioPlayer({ url }: PlayerProps) {
  return (
    <div className={styles.wrapper}>
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height={50}
        config={{ file: { attributes: { disablePictureInPicture: true } } }}
      />
    </div>
  );
}

export function YoutubePlayer({ url }: PlayerProps) {
  return (
    <div className={styles.wrapper}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${url}`}
        controls
        width="100%"
        height="100%"
        config={{ file: { attributes: { disablePictureInPicture: true } } }}
      />
    </div>
  );
}
