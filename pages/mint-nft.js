import Image from 'next/image';
import GlobalContext from '../utils/global-context';
import { useContext } from 'react';

function MintNFT() {
  const global = useContext(GlobalContext);

  const handleMetadata = () => {
    try {
      async function streamToIPFS() {
        const topicString = global.submittedTopics.join('%20%7C%20');
        const encodedTopicString = topicString.replace(' ', '%20');
        const encodedImgUrl = encodeURIComponent(global.imageURL);
        const netlifyURL = `/.netlify/functions/ipfs-stream?topics=${encodedTopicString}&imageUrl=${encodedImgUrl}`;
        try {
          const netlifyResponse = await fetch(netlifyURL).then(res =>
            res.json()
          );
          global.update({
            metadataCID: netlifyResponse.metadataCID,
          });
        } catch {
          global.update({
            metadataCID: false,
          });
        }
      }
      streamToIPFS();
    } catch {
      global.update({
        metadataCID: false,
      });
    }
  };

  return (
    <>
      <h3>
        Connect your favorite web3 wallet to mint your inTheory NFT on the Celo
        blockchain.
      </h3>
      <div>
        <button>Connect Wallet</button>
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

export default MintNFT;
