import styles from '../styles/MintNFT.module.css';
import Link from 'next/link';

function ConnectedAccount(props) {
  const abbvAddress =
    props.address.substring(0, 4) +
    '......' +
    props.address.substring(props.address.length - 6, props.address.length);

  return (
    <>
      <div>
        <h2>Wallet Connected</h2>
        <h3>Nice work!</h3>
        <p>
          Just hit the button below to mint your NFT to the connected wallet
          address.
        </p>
        <Link href="/completed">
          <button className="main-button gradient-border">Mint NFT</button>
        </Link>
      </div>
      <p>
        Connected address: <br />
        <span className={styles.address}>{abbvAddress}</span>
        <br />
        <span className={styles.disclaimer}>
          Only 1 inTheory NFT can be minted per wallet address.
        </span>
      </p>
      <p></p>
    </>
  );
}

export default ConnectedAccount;
