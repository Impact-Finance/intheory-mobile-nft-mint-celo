import GlobalContext from '../utils/global-context';
import { useContext, useEffect, useState } from 'react';
import GenFailed from '../components/GenFailed';
import Loading from '../components/Loading';
import Done from '../components/Done';
import BadAddress from '../components/BadAddress';
import { useCelo } from '@celo/react-celo';

export default function Completed() {
  const global = useContext(GlobalContext);
  const { connect, address } = useCelo();

  const [isReturned, setIsReturned] = useState({
    isLoaded: false,
    isFailed: false,
  });

  const [badAddress, setBadAddress] = useState();
  const [tokenId, setTokenId] = useState('');

  useEffect(() => {
    try {
      const saveAndMint = async () => {
        const topicString = global.submittedTopics.join('%2C%20');
        const encodedTopicString = topicString.replace(' ', '%20');
        const imageURL = global.imageURL;
        const encodedImageURL = encodeURIComponent(imageURL);

        const netlifyIPFSUrl = `/.netlify/functions/ipfs-stream?topics=${encodedTopicString}&imageUrl=${encodedImageURL}&wallet=${address}`;

        const netlifyIPFSResponse = await fetch(netlifyIPFSUrl).then(res =>
          res.json()
        );

        const metadataCID = netlifyIPFSResponse.metadataCID;
        setBadAddress(netlifyIPFSResponse.badAddress);
        global.update({
          ...global,
          metadataCID: metadataCID,
        });
        !netlifyIPFSResponse.metadataCID &&
          setIsReturned({ ...isReturned, isFailed: true });
        if (netlifyIPFSResponse.badAddress === false) {
          console.log('ADDRESS GOOD, MINTING NFT');
          console.log(`Metadata CID: ${metadataCID}`);
          const netlifyMintUrl = `/.netlify/functions/tatum-mint?metadataCID=${metadataCID}&wallet=${address}`;
          const netlifyMintResponse = await fetch(netlifyMintUrl).then(res =>
            res.json()
          );
          const txnID = netlifyMintResponse.txnID;
          setTokenId(netlifyMintResponse.tokenId);
          global.update({
            ...global,
            txnID: txnID,
            metadataCID: metadataCID,
          });
          !txnID
            ? setIsReturned({ ...isReturned, isFailed: true })
            : setIsReturned({ ...isReturned, isLoaded: true });
        }
      };
      saveAndMint();
    } catch {
      setIsReturned({ ...isReturned, isFailed: true });
    }
  }, []);

  return (
    <>
      {!address || badAddress ? (
        <BadAddress />
      ) : isReturned.isFailed ? (
        <div>
          <GenFailed actionString="NFT minting" />
        </div>
      ) : isReturned.isLoaded && !isReturned.isFailed ? (
        <Done
          txnID={global.txnID}
          address={address}
          tokenId={tokenId}
        />
      ) : (
        <div>
          <Loading
            action="Minting NFT..."
            message="Creating metadata and minting on the Celo blockchain"
          />
        </div>
      )}
    </>
  );
}
