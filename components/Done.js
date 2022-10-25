import styles from '../styles/MintNFT.module.css';
import Image from 'next/image';
import Socials from './Socials';
import { useEffect, useState } from 'react';
import JSConfetti from 'js-confetti';

function Done(props) {
  const [isCopied, setIsCopied] = useState({ address: false, txnID: false });
  const abbvMetadataCID =
    props.metadataCID.substring(0, 3) +
    '......' +
    props.metadataCID.substring(
      props.metadataCID.length - 5,
      props.metadataCID.length
    );
  const abbvTxnID =
    props.txnID.substring(0, 3) +
    '......' +
    props.txnID.substring(props.txnID.length - 5, props.txnID.length);

  const copyAddress = () => {
    navigator.clipboard.writeText(props.metadataCID);
    setIsCopied({ address: true });
  };
  const copyTxn = () => {
    navigator.clipboard.writeText(props.txnID);
    setIsCopied({ txnID: true });
  };

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ['🧬', '🪐', '🔭', '🧪', '🔬', '💫'],
      emojiSize: 60,
      confettiNumber: 25,
    });
    jsConfetti.addConfetti({
      confettiColors: ['#68eaff', '#fe00fe', '#002060'],
      confettiNumber: 350,
    });
  }, []);

  return (
    <>
      <div>
        <h2>Congratulations!</h2>
        <h3 className={styles.success}>
          Your inTheory Pre-Launch NFT was successfully minted on Celo!
        </h3>
        <a
          href={`https://nfts.valoraapp.com/?address=${props.address}`}
          target="_blank"
          rel="noopener noreferrer">
          <button className="main-button">View NFT</button>
        </a>
        <div className={styles.detailContainer}>
          <p className={styles.disclaimer}>
            Metadata CID:
            <br />
            <span
              className={styles.address}
              onClick={copyAddress}
              style={{ cursor: 'pointer' }}>
              {abbvMetadataCID}{' '}
              <span className="logo">
                <Image
                  src="/images/copy.svg"
                  alt="copy"
                  width={15}
                  height={15}
                />
              </span>
            </span>
            <br />
            {isCopied.address ? (
              <span className={styles.copy}>Copied!</span>
            ) : (
              <span>&nbsp;</span>
            )}
          </p>
          <p className={styles.disclaimer}>
            Transaction ID:
            <br />
            <span
              className={styles.address}
              onClick={copyTxn}
              style={{ cursor: 'pointer' }}>
              {abbvTxnID}{' '}
              <span className="logo">
                <Image
                  src="/images/copy.svg"
                  alt="copy"
                  width={15}
                  height={15}
                />
              </span>
            </span>
            <br />
            {isCopied.txnID ? (
              <span className={styles.copy}>Copied!</span>
            ) : (
              <span>&nbsp;</span>
            )}
          </p>
        </div>
        <p className={styles.thanks}>
          Thank you for showing your support for decentralized science. Keep an
          eye on our socials for development updates!
        </p>
      </div>
      <Socials />
    </>
  );
}

export default Done;
