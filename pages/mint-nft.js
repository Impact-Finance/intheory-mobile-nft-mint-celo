import Image from 'next/image';

function MintNFT() {
  return (
    <>
      <h3>
        Connect your favorite web3 wallet to mint your inTheory pre-launch NFT.
      </h3>
      <div>
        <button>Connect Wallet</button>
        <div className="partner-ref">
          <a
            href="https://celo.org/"
            target="_blank"
            rel="noopener noreferrer">
            NFT minted on Celo
            <span className="logo">
              <Image
                src="/images/celo-logo.ico"
                alt="Celo Logo"
                width={18}
                height={18}
              />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

export default MintNFT;
