import styles from '../styles/GenerateImage.module.css';
import React from 'react';
import YouTube from 'react-youtube';

export default class OurVideo extends React.Component {
  render() {
    const opts = {
      height: '190',
      width: '300',
      playerVars: {
        autoplay: 0,
      },
    };

    return (
      <>
        <div className={styles.video}>
          <YouTube
            videoId="HHyFnCi6wQk"
            opts={opts}
            onReady={this._onReady}
            onEnd={this.props.endFunction}
          />
        </div>
        <div className={styles.vidAlt}>
          <a
            href="https://www.youtube.com/watch?v=HHyFnCi6wQk"
            target="_blank"
            rel="noopener noreferrer">
            inTheory Intro Video
          </a>
        </div>
      </>
    );
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
}
