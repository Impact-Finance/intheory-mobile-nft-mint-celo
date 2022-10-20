import Image from 'next/image';

function MintNFT() {
  return (
    <>
      <h3>
        Connect your favorite web3 wallet to mint your inTheory NFT on the Celo
        blockchain.
      </h3>
      <div>
        <button>Connect Wallet</button>
        {/* <div className="partner-ref">
          <a
            href="https://celo.org/"
            target="_blank"
            rel="noopener noreferrer">
            NFT minted on Celo
            <span className="logo">
              <Image
                src="/images/celo-logo.png"
                alt="Celo Logo"
                width={18}
                height={18}
              />
            </span>
          </a>
        </div> */}
      </div>
      <div className="divider"></div>
      <div>
        <h3>Don't have a web3 wallet yet?</h3>
        <a
          href="https://valoraapp.com/"
          target="_blank"
          rel="noopener noreferrer">
          <span className="logo">
            <Image
              src="/images/valora.png"
              alt="Valora Logo"
              width={60}
              height={60}
            />
          </span>
          <p>
            Create one with Valora using just your phone number, and then come
            back here to mint your inTheory NFT.
          </p>
        </a>
      </div>
    </>
  );
}

export default MintNFT;
