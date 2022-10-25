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
      async function IPFSstream() {
        const topicString = global.submittedTopics.join('%20');
        const encodedTopicString = topicString.replace(' ', '%20');
        const imageURL = global.imageURL;
        const encodedImageURL = encodeURIComponent(imageURL);

        const netlifyURL = `/.netlify/functions/ipfs-stream?topics=${encodedTopicString}&imageUrl=${encodedImageURL}`;

        try {
          const netlifyResponse = await fetch(netlifyURL).then(res =>
            res.json()
          );
          const txnID = netlifyResponse.metadataCID;
          const metadataCID = netlifyResponse.metadataCID;
          const netlifyResponseBadAddress = false; //edit when response is real
          if (netlifyResponseBadAddress === true) {
            setBadAddress(true);
          }
          global.update({
            ...global,
            txnID: txnID,
            metadataCID: metadataCID,
          });
          !netlifyResponse.metadataCID
            ? setIsReturned({ isLoaded: true, isFailed: true })
            : setIsReturned({ isLoaded: true, isFailed: false });
        } catch {
          setIsReturned({ isLoaded: true, isFailed: true });
        }
      }
      IPFSstream();
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
