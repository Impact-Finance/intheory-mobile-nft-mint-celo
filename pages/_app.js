import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import GlobalContext from '../utils/global-context';
import { CeloProvider, NetworkNames } from '@celo/react-celo';
import '@celo/react-celo/lib/styles.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    submittedTopics: [],
    imageURL: '',
    txnID: '',
    metadataCID: '',
    update,
  });

  function update(data) {
    setState(Object.assign({}, state, data));
  }

  return (
    <>
      <CeloProvider
        defaultNetwork={NetworkNames.Alfajores}
        dapp={{
          name: 'inTheory Pre-Launch NFT Mint',
          description:
            'Mint your free pre-launch research-inspired NFT to earn exclusive benefits when inTheory launches in 2023.',
          url: 'https://intheory.impact-finance.io',
        }}
        theme={{
          primary: '#68eaff',
          secondary: '#002060',
          text: '#ffffff',
          textSecondary: '#ffffff',
          textTertiary: '#ffffff',
          muted: '#68eaffa5',
          background: '#002060a6',
          error: '#fe00fe',
        }}
        connectModal={{
          // This option changes the title of the modal and can be either a string or a react element
          title: <span>Connect your Wallet</span>,
        }}>
        <GlobalContext.Provider value={state}>
          <Head>
            <link
              rel="icon"
              href="/images/inTheory.ico"
            />
            <title>inTheory NFT Mint</title>
            <meta
              name="description"
              content="Mint a free inTheory pre-launch NFT showing your support for open science."
            />
            <meta
              name="author"
              content="Impact-Finance"
            />
            {/* <!-- Twitter card  --> */}
            <meta
              name="twitter:card"
              content="summary_large_image"
            />
            <meta
              name="twitter:site"
              content="@DeSci_Impact"
            />
            <meta
              name="twitter:title"
              content="inTheory Pre-Launch NFT Mint"
            />
            <meta
              name="twitter:description"
              content="Mint your free pre-launch research-inspired NFT to earn exclusive benefits when inTheory launches in 2023."
            />
            <meta
              name="twitter:image"
              content="https://d33wubrfki0l68.cloudfront.net/4de8289ff34ff200c5b68da75e827c4bea493088/dab22/assets/images/intheory-card.png"
            />

            {/* <!-- Open Graph Meta Tags --> */}
            <meta
              property="og:title"
              content="inTheory Pre-Launch NFT Mint"
            />
            <meta
              property="og:type"
              content="website"
            />
            <meta
              property="og:site_name"
              content="inTheory Pre-Launch NFT Mint"
            />
            <meta
              property="og:description"
              content="Mint your free pre-launch research-inspired NFT to earn exclusive benefits when inTheory launches in 2023."
            />
            <meta
              property="og:url"
              content="https://intheory.impact-finance.io/"
            />
            <meta
              property="og:image"
              content="https://d33wubrfki0l68.cloudfront.net/4de8289ff34ff200c5b68da75e827c4bea493088/dab22/assets/images/intheory-card.png"
            />
          </Head>
          <div className="container">
            <div className="AppBox">
              <Link href="/">
                <div style={{ cursor: 'pointer' }}>
                  <Image
                    src="/images/intheory-logo.png"
                    alt="inTheory Logo"
                    width={592}
                    height={125}
                  />
                </div>
              </Link>
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
      </CeloProvider>
    </>
  );
}
