import styles from '../styles/HowTo.module.css';
import Link from 'next/link';

export default function HowTo() {
  return (
    <>
      <div>
        <h2>How it works</h2>
        <div className={styles.stepItem}>
          <span className={styles.numberIcon}>1</span>
          <p className={styles.stepDescription}>
            Select the research topics that align with your interests.
          </p>
        </div>
        <div className={styles.stepItem}>
          <span className={styles.numberIcon}>2</span>
          <p className={styles.stepDescription}>
            An AI-generated artwork inspired by your selection is created and
            minted as a unique NFT.
          </p>
        </div>
        <div className={styles.stepItem}>
          <span className={styles.numberIcon}>3</span>
          <p className={styles.stepDescription}>
            All holders of a pre-launch NFT will receive exclusive benefits when
            inTheory launches in 2023.
          </p>
        </div>
      </div>
      <Link href="/select-topics">
        <button>Let's go!</button>
      </Link>
    </>
  );
}
