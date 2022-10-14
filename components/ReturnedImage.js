import styles from '../styles/GenerateImage.module.css';
import Link from 'next/link';
import GlobalContext from '../utils/global-context';
import { useContext } from 'react';
import sendMetadata from '../utils/sendMetadata';

function ReturnedImage() {
  const global = useContext(GlobalContext);

  const handleMint = () => {
    const { submittedTopics, imageURL } = global;
    sendMetadata(submittedTopics, imageURL);
  };

  return (
    <>
      <div>
        <img
          className={styles.deliveredImg}
          src={global.imageURL}
          alt="AI-generated image"
        />
      </div>
      <div>
        <div>
          <Link href="/mint-nft">
            <button onClick={handleMint}>Mint as NFT</button>
          </Link>
        </div>
        <div
          style={{
            marginTop: '1rem',
          }}>
          <p>
            Don&apos;t like your image?{' '}
            <Link href="/select-topics">
              <span
                style={{
                  color: '#68eaff',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>
                Try again
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ReturnedImage;
