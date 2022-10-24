import { Html, Head, Main, NextScript } from 'next/document';
import { MetaTags } from 'react-meta-tags';

export default function Document() {
  return (
    <Html>
      <MetaTags>
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
      </MetaTags>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
