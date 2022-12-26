import styles from '../styles/Home.module.css';
import GlobalContext from '../utils/global-context';
import Link from 'next/link';
import { useEffect, useContext } from 'react';

export default function Home() {
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
        <h1>
          Pre-Launch
          <br />
          NFT Mint
        </h1>
        <p style={{ fontSize: '1.4em' }}>
          The minting period has{' '}
          <strong style={{ color: '#fe00fe' }}>closed</strong>.
        </p>
      </div>
      <div>
        <Link href="/how-it-works">
          <button
            className="main-button"
            disabled>
            Start →
          </button>
        </Link>
        <p style={{ filter: 'opacity(0.7)' }}>
          We&apos;ll even cover the gas fees.
        </p>
      </div>
    </>
  );
}
