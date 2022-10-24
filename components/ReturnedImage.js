import styles from '../styles/GenerateImage.module.css';
import Link from 'next/link';
import GlobalContext from '../utils/global-context';
import { useContext } from 'react';

function ReturnedImage() {
  const global = useContext(GlobalContext);

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
            <button className="gradient-border">Mint as NFT</button>
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
