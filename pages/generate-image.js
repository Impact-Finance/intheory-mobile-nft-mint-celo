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

          // DUMMY RESPONSE FOR TESTING
          // const netlifyResponse = {
          //   imgURL:
          //     'https://replicate.delivery/pbxt/YhJKP9lWTJKWKtN2u3n8NnKQ23BlTNztkLce5nRch08aY97HA/out-0.png',
          // };

          global.update({
            imageURL: netlifyResponse.imgURL,
            submittedTopics: global.submittedTopics,
          });
          !netlifyResponse.imgURL
            ? setIsReturned({ isLoaded: true, isFailed: true })
            : setIsReturned({ isLoaded: true, isFailed: false });
        } catch {
          setIsReturned({ isLoaded: true, isFailed: true });
        }
      }
      makeAPICall();
    } catch {
      setIsReturned({ isLoaded: true, isFailed: true });
    }
  }, []);

  return (
    <div>
      {isReturned.isFailed ? (
        <GenFailed actionString="Image generation" />
      ) : isReturned.isLoaded ? (
        <ReturnedImage />
      ) : (
        <Loading />
      )}
    </div>
  );
}
