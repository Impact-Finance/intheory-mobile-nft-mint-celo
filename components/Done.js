import styles from '../styles/MintNFT.module.css';
import Image from 'next/image';
import Socials from './Socials';
import { useEffect, useState } from 'react';
import JSConfetti from 'js-confetti';

function Done(props) {
  const [isCopied, setIsCopied] = useState({ address: false, txnID: false });
  const contractAddress = process.env.contractAddress;
  const abbvContractAddress =
    contractAddress.substring(0, 2) +
    '......' +
    contractAddress.substring(
      contractAddress.length - 5,
      contractAddress.length
    );
  const abbvTxnID =
    props.txnID.substring(0, 2) +
    '......' +
    props.txnID.substring(props.txnID.length - 5, props.txnID.length);

  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress);
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
      emojiSize: 80,
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
        <br />
        <a
          className={styles.metalink}
          href={`https://impact-finance.mypinata.cloud/ipfs/${props.metadataCID}`}
          target="_blank"
          rel="noopener noreferrer">
          View metadata
        </a>
        <div className={styles.detailContainer}>
          <p className={styles.disclaimer}>
            Contract address:
            <br />
            <span
              className={styles.address}
              onClick={copyAddress}
              style={{ cursor: 'pointer' }}>
              {abbvContractAddress}{' '}
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
          eye on our socials for development updates and perks for NFT holders!
        </p>
      </div>
      <Socials />
    </>
  );
}

export default Done;
