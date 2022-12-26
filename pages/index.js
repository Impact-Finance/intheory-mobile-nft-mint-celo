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
        <p>
          <strong>6,961</strong> inTheory NFTs minted
        </p>
        <p>
          <a
            style={{ filter: 'opacity(0.7)', textDecoration: 'underline' }}
            href="https://explorer.celo.org/mainnet/token/0xFF5e58Ce9408858f6BB5Fb979b08E9D6f21A276d/inventory"
            target="_blank"
            rel="noopener noreferrer">
            View on Explorer →
          </a>
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
