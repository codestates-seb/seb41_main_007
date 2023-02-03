import styles from './Styles/reactPlayer.module.css';

import ReactPlayer from 'react-player';

export interface PlayerProps {
  url: string;
}

export function YoutubePlayer({ url }: PlayerProps) {
  return (
    <div className={styles.wrapper}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${url}&origin=https://www.farmpi.link/`}
        controls
        width="100%"
        height="100%"
        config={{ file: { attributes: { disablePictureInPicture: true } } }}
      />
    </div>
  );
}
