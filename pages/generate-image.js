import GlobalContext from '../utils/global-context';
import { useContext, useEffect, useState } from 'react';
import GenFailed from '../components/GenFailed';
import Loading from '../components/Loading';
import ReturnedImage from '../components/ReturnedImage';

export default function GenerateImage() {
  const global = useContext(GlobalContext);

  const [isReturned, setIsReturned] = useState({
    isLoaded: false,
    isFailed: false,
  });

  const pollIPFS = async metadataCID => {
    const netlifyPollUrl = `/.netlify/functions/begin-polling-background?metadataCID=${metadataCID}`;
    await fetch(netlifyPollUrl)
      .then(res => res.json())
      .catch(e => {
        console.log(e);
      });
  };

  const sendIPFS = async () => {
    const prevMeta = global.metadataCID;
    if (!prevMeta) {
      const topicString = global.submittedTopics.join('%2C%20');
      const encodedTopicString = topicString.replace(' ', '%20');
      const imageURL = global.imageURL;
      const encodedImageURL = encodeURIComponent(imageURL);

      const netlifyIPFSUrl = `/.netlify/functions/ipfs-stream?topics=${encodedTopicString}&imageUrl=${encodedImageURL}`;

      const netlifyIPFSResponse = await fetch(netlifyIPFSUrl).then(res =>
        res.json()
      );

      const metadataCID = netlifyIPFSResponse.metadataCID;
      global.update({
        ...global,
        metadataCID: metadataCID,
      });
      !netlifyIPFSResponse.metadataCID &&
        setIsReturned({ ...isReturned, isFailed: true });
      if (!metadataCID) {
        console.log('ERROR UPLOADING METADATA TO IPFS');
      } else {
        console.log(
          `METADATA SUCCESSFULLY UPLOADED TO IPFS. CID: ${metadataCID}`
        );
        console.log('BEGINNING POLLING OF IPFS.');
        await pollIPFS(metadataCID);
      }
    } else {
      console.log('METADATA ALREADY ON IPFS, CID: ' + prevMeta);
    }
  };

  useEffect(() => {
    try {
      async function makeAPICall() {
        const topicString = global.submittedTopics.join('%20');
        const encodedTopicString = topicString.replace(' ', '%20');

        //WOMBO DREAM API
        // const netlifyURL = `/.netlify/functions/dream-call?topics=${encodedTopicString}`;

        //STABLE DIFFUSION API
        const netlifyURL = `/.netlify/functions/stability-call?topics=${encodedTopicString}`;

        try {
          const netlifyResponse = await fetch(netlifyURL).then(res =>
            res.json()
          );

          global.update({
            ...global,
            imageURL: netlifyResponse.imgURL,
          });
          !netlifyResponse.imgURL
            ? setIsReturned({ isLoaded: true, isFailed: true })
            : setIsReturned({ isLoaded: true, isFailed: false });
        } catch {
          setIsReturned({ isLoaded: true, isFailed: true });
        }
      }
      if (!global.imageURL) {
        makeAPICall();
      } else {
        setIsReturned({ isLoaded: true, isFailed: false });
      }
    } catch {
      setIsReturned({ isLoaded: true, isFailed: true });
    }
  }, []);

  return (
    <div>
      {isReturned.isFailed ? (
        <GenFailed
          actionString="Image generation"
          destination="/select-topics"
        />
      ) : isReturned.isLoaded ? (
        <ReturnedImage
          imageURL={global.imageURL}
          sendIPFS={sendIPFS}
        />
      ) : (
        <Loading
          action="Generating image..."
          message="This should take less than 30 seconds"
        />
      )}
    </div>
  );
}
