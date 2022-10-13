import GlobalContext from '../utils/global-context';
import { useContext, useEffect, useState } from 'react';
import styles from '../styles/GenerateImage.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function GenerateImage() {
  const global = useContext(GlobalContext);

  const [isReturned, setIsReturned] = useState({
    isLoaded: false,
    isFailed: false,
  });

  useEffect(() => {
    try {
      async function makeAPICall() {
        const topicString = global.submittedTopics.join('%20%7C%20');
        const encodedTopicString = topicString.replace(' ', '%20');
        const netlifyURL = `/.netlify/functions/dream-call?topics=${encodedTopicString}`;
        try {
          const netlifyResponse = await fetch(netlifyURL).then(res =>
            res.json()
          );
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
    <>
      <div className={styles.GenerateBox}>
        {isReturned.isFailed ? (
          <>
            <div style={{ marginBottom: '20%' }}>
              <Image
                src="/images/robot-confused.png"
                alt="confused robot"
                width={200}
                height={200}
              />
              <h3>Uh oh! Image generation failed!</h3>
            </div>
            <Link href="/select-topics">
              <button>Try again</button>
            </Link>
          </>
        ) : isReturned.isLoaded ? (
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
                  <button>Mint as NFT</button>
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
        ) : (
          <div className={styles.sectionLoading}>
            <ul className={styles.listBars}>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div>
              <h2>Generating image...</h2>
              <p>This should take less than 15 seconds</p>
              {/* <div className="partner-ref">
                <a
                  href="https://www.wombo.art/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Generated with
                  <span className="logo">
                    <Image
                      src="/images/wombo.png"
                      alt="WOMBO.ai Logo"
                      width={70}
                      height={18}
                    />
                  </span>
                </a>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
