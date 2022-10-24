import GlobalContext from '../utils/global-context';
import { useContext } from 'react';
import ConnectWallet from '../components/ConnectWallet';

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

  return <ConnectWallet />;
}

export default MintNFT;
