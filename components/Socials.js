import Image from 'next/image';
import styles from '../styles/MintNFT.module.css';

function Socials() {
  return (
    <>
      <div>
        <div className={styles.detailContainer}>
          <a
            href="https://twitter.com/DeSci_Impact"
            target="_blank"
            rel="noopener noreferrer">
            <div className={styles.socialIcon}>
              <Image
                src="/images/twitter.svg"
                alt="twitter"
                width={35}
                height={35}
              />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/company/impact-finance-desci/"
            target="_blank"
            rel="noopener noreferrer">
            <div className={styles.socialIcon}>
              <Image
                src="/images/linkedin.svg"
                alt="linkedin"
                width={35}
                height={35}
              />
            </div>
          </a>
          <a
            href="https://medium.com/impact-finance"
            target="_blank"
            rel="noopener noreferrer">
            <div className={styles.socialIcon}>
              <Image
                src="/images/medium.svg"
                alt="medium"
                width={35}
                height={35}
              />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Socials;
