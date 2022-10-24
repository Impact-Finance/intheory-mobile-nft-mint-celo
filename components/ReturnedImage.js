import styles from '../styles/GenerateImage.module.css';
import Link from 'next/link';

function ReturnedImage(props) {
  return (
    <>
      <div>
        <img
          className={styles.deliveredImg}
          src={props.imageURL}
          alt="AI-generated image"
        />
      </div>
      <div>
        <div>
          <Link href="/mint-nft">
            <button className="gradient-border main-button">Mint as NFT</button>
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
