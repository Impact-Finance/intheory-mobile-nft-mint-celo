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

  const [badAddress, setBadAddress] = useState(false);

  useEffect(() => {
    try {
      const saveAndMint = async () => {
        const topicString = global.submittedTopics.join('%2C%20');
        const encodedTopicString = topicString.replace(' ', '%20');
        const imageURL = global.imageURL;
        const encodedImageURL = encodeURIComponent(imageURL);

        const netlifyIPFSUrl = `/.netlify/functions/ipfs-stream?topics=${encodedTopicString}&imageUrl=${encodedImageURL}&wallet=${address}`;

        try {
          const netlifyIPFSResponse = await fetch(netlifyIPFSUrl).then(res =>
            res.json()
          );

          const metadataCID = netlifyIPFSResponse.metadataCID;
          setBadAddress(netlifyIPFSResponse.badAddress);
          global.update({
            ...global,
            metadataCID: metadataCID,
          });
          !netlifyIPFSResponse.metadataCID
            ? setIsReturned({ isLoaded: true, isFailed: true })
            : setIsReturned({ isLoaded: true, isFailed: false });
          if (netlifyIPFSResponse.badAddress === false) {
            console.log('ADDRESS GOOD, MINTING NFT');
            const metadataCID = global.metadataCID;
            console.log(`Meatadata CID: ${metadataCID}`);
            const netlifyMintUrl = `/.netlify/functions/tatum-mint?metadataCID=${metadataCID}&wallet=${address}`;
            try {
              const netlifyMintResponse = await fetch(netlifyMintUrl).then(
                res => res.json()
              );
              const txnID = netlifyMintResponse.txnID;
              global.update({
                ...global,
                txnID: txnID,
              });
              !netlifyMintResponse.txnID
                ? setIsReturned({ isLoaded: true, isFailed: true })
                : setIsReturned({ isLoaded: true, isFailed: false });
            } catch {
              setIsReturned({ isLoaded: true, isFailed: true });
            }
          }
        } catch {
          setIsReturned({ isLoaded: true, isFailed: true });
        }
      };
      saveAndMint();
    } catch {
      setIsReturned({ isLoaded: true, isFailed: true });
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
      ) : isReturned.isLoaded ? (
        <Done
          txnID={global.txnID}
          address={address}
          metadataCID={global.metadataCID}
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
