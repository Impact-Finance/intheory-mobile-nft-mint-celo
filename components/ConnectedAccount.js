import GlobalContext from '../utils/global-context';
import styles from '../styles/MintNFT.module.css';
import Link from 'next/link';
import { useContext } from 'react';

function ConnectedAccount(props) {
  const global = useContext(GlobalContext);
  const abbvAddress =
    props.address.substring(0, 4) +
    '......' +
    props.address.substring(props.address.length - 6, props.address.length);

  return (
    <>
      {!global.metadataCID ? (
        <h2 className={styles.connecting}>Finalizing connection.....</h2>
      ) : (
        <>
          <div>
            <h2>Wallet Connected</h2>
            <h3>Nice work!</h3>
            <p>
              Just hit the button below to mint your NFT to the connected wallet
              address.
            </p>
            <Link href="/completed">
              <button
                className="main-button gradient-border"
                disabled={!global.metadataCID}>
                Mint NFT
              </button>
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
        </>
      )}
    </>
  );
}

export default ConnectedAccount;
