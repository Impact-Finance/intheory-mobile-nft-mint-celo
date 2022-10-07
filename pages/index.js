import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div>
        <h1>
          Pre-Launch
          <br />
          NFT Mint
        </h1>
        <p style={{ fontSize: '1.4em' }}>
          Mint your free research-inspired NFT artwork to show your support for
          open science.
        </p>
      </div>
      <Link href="/how-it-works">
        <button>Start →</button>
      </Link>
    </>
  );
}
