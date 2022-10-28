import styles from '../styles/GenerateImage.module.css';
import OurVideo from './OurVideo';
import React, { useState } from 'react';

function VidLoading() {
  const [vidEnded, setVidEnded] = useState(false);
  const endFunction = () => {
    setVidEnded(true);
  };
  return (
    <>
      <h2>Minting NFT...</h2>
      <h3>This will take 4-5 minutes.</h3>
      <p>
        In the meantime, check out this short video for a sneak peak of what you
        can expect when inTheory launches in 2023.
      </p>
      <div className={styles.vidLoading}>
        <div>
          {!vidEnded ? (
            <OurVideo
              className={styles.video}
              endFunction={endFunction}
            />
          ) : (
            <h3 className={styles.afterVid}>
              Thanks for watching!
              <br />
              Your NFT should be ready soon.
            </h3>
          )}
          <p className={styles.submessage}>
            Don't close this page or your artwork could be lost forever!
          </p>
        </div>
      </div>
    </>
  );
}

export default VidLoading;
