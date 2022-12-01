import styles from '../styles/HowTo.module.css';
import Link from 'next/link';
import { useEffect, useContext } from 'react';
import GlobalContext from '../utils/global-context';

export default function HowTo() {
  const global = useContext(GlobalContext);
  useEffect(() => {
    global.update({
      ...global,
      submittedTopics: [],
      imageURL: '',
      txnID: '',
      metadataCID: '',
    });
  }, []);
  return (
    <>
      <div>
        <h2>How it works</h2>
        <div className={styles.stepItem}>
          <span className={styles.numberIcon}>1</span>
          <p className={styles.stepDescription}>
            Select up to 3 research topics. Your choices will influence the
            selection of inTheory&apos;s first project cohort.
          </p>
        </div>
        <div className={styles.stepItem}>
          <span className={styles.numberIcon}>2</span>
          <p className={styles.stepDescription}>
            An AI-generated artwork inspired by your selection is created and
            minted as an NFT.
          </p>
        </div>
        <div className={styles.stepItem}>
          <span className={styles.numberIcon}>3</span>
          <p className={styles.stepDescription}>
            All pre-launch NFT holders will receive exclusive benefits when
            inTheory launches in 2023.
          </p>
        </div>
      </div>
      <Link href="/select-topics">
        <button className="main-button">Let&apos;s go!</button>
      </Link>
    </>
  );
}
