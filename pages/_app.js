import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import GlobalContext from '../utils/global-context';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    submittedTopics: [],
    imageURL: '',
    update,
  });

  function update(data) {
    setState(Object.assign({}, state, data));
  }

  return (
    <>
      <GlobalContext.Provider value={state}>
        <Head>
          <title>inTheory NFT Mint</title>
          <meta
            name="description"
            content="Mint a free inTheory pre-launch NFT showing your support for open science."
          />
          <link
            rel="icon"
            href="/images/inTheory.ico"
          />
        </Head>
        <div className="container">
          <div className="AppBox">
            <Image
              src="/images/intheory-logo.png"
              alt="inTheory Logo"
              width={592}
              height={125}
            />
            <Component {...pageProps} />
          </div>
        </div>
        <footer>
          <a
            href="https://impact-finance.io"
            target="_blank"
            rel="noopener noreferrer">
            Built by Impact Finance
            <span className="logo">
              <Image
                src="/images/IF.svg"
                alt="Impact Finance Logo"
                width={19}
                height={16}
              />
            </span>
          </a>
        </footer>
      </GlobalContext.Provider>
    </>
  );
}
