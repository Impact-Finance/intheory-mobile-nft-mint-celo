import styles from '../styles/GenerateImage.module.css';
import Link from 'next/link';
import GlobalContext from '../utils/global-context';
import { useContext } from 'react';

function ReturnedImage() {
  const global = useContext(GlobalContext);

  const handleMetadata = () => {
    try {
      async function streamToIPFS() {
        const topicString = global.submittedTopics.join('%20%7C%20');
        const encodedTopicString = topicString.replace(' ', '%20');
        const encodedImgUrl = encodeURIComponent(global.imageURL);
        const netlifyURL = `/.netlify/functions/ipfs-stream?topics=${encodedTopicString}&s3url=${encodedImgUrl}`;
        try {
          const netlifyResponse = await fetch(netlifyURL).then(res =>
            res.json()
          );
          global.update({
            metadataCID: netlifyResponse.metadataCID,
          });
          console.log(netlifyResponse.metadataCID);
        } catch {
          // console.log('error with netlify IPFS stream function');
          global.update({
            metadataCID: false,
          });
        }
      }
      streamToIPFS();
    } catch {
      // console.log('error with netlify IPFS stream function (outer)');
      global.update({
        metadataCID: false,
      });
    }
  };

  return (
    <>
      <div>
        <img
          className={styles.deliveredImg}
          src={global.imageURL}
          alt="AI-generated image"
        />
      </div>
      <div>
        <div>
          <Link href="/mint-nft">
            <button onClick={handleMetadata}>Mint as NFT</button>
          </Link>
        </div>
        <div
          style={{
            marginTop: '1rem',
          }}>
          <p>
            Don&apos;t like your image?{' '}
            <Link href="/select-topics">
              <span
                style={{
                  color: '#68eaff',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>
                Try again
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ReturnedImage;
