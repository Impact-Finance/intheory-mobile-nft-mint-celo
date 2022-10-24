import Image from 'next/image';
import { useCelo } from '@celo/react-celo';

function ConnectWallet() {
  const { connect, address } = useCelo();
  return (
    <>
      <h3>
        Connect your favorite web3 wallet to mint your inTheory NFT on the Celo
        blockchain.
      </h3>
      <div>
        <button
          onClick={connect}
          className="main-button">
          Connect Wallet
        </button>
      </div>
      <div className="divider"></div>
      <div>
        <h3>Don&apos;t have a web3 wallet?</h3>
        <p>
          Create one with Valora using just your phone number, and then come
          back here to mint your inTheory NFT.
        </p>
      </div>
      <div>
        <a
          href="https://valoraapp.com/"
          target="_blank"
          rel="noopener noreferrer">
          <span className="logo">
            <Image
              src="/images/valora.png"
              alt="Valora Logo"
              width={182}
              height={60}
            />
          </span>
        </a>
      </div>
    </>
  );
}

export default ConnectWallet;
