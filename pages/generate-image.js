import GlobalContext from '../utils/global-context';
import { useContext, useEffect, useState } from 'react';
import styles from '../styles/GenerateImage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import send_task_to_dream_api from '../utils/send_task_to_dream_api';

export default function GenerateImage() {
  const global = useContext(GlobalContext);

  const [isReturned, setIsReturned] = useState({
    isLoaded: false,
    isFailed: false,
  });

  useEffect(() => {
    async function makeAPICall() {
      console.log('MAKING API CALL');
      console.log(global.submittedTopics);
      const topicString = global.submittedTopics.join(' | ');
      const styleNumbers = [1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 17, 19, 21];
      const imgStyle =
        styleNumbers[Math.floor(Math.random() * styleNumbers.length)];
      const imgURL = await send_task_to_dream_api(imgStyle, topicString);
      global.update({
        imageURL: imgURL,
      });
      !imgURL
        ? setIsReturned({ isLoaded: true, isFailed: true })
        : setIsReturned({ isLoaded: true, isFailed: false });
    }
    makeAPICall();
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
            <button>Try again</button>
          </>
        ) : isReturned.isLoaded ? (
          <>
            <div style={{ marginBottom: '15px' }}>
              <img
                className={styles.deliveredImg}
                src={global.imageURL}
                alt="AI-generated image"
              />
            </div>
            <div>
              <div>
                <Link href="/">
                  <button>Mint as NFT</button>
                </Link>
              </div>
              <div
                style={{
                  marginTop: '1rem',
                }}>
                <p>
                  Don't like your image?{' '}
                  <span
                    style={{
                      color: '#68eaff',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}>
                    Try again
                  </span>
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
            <h2>Generating image...</h2>
            <p>This might take a minute</p>
          </div>
        )}
      </div>
    </>
  );
}
