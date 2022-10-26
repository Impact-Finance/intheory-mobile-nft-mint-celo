[![GitHub license](https://img.shields.io/github/license/Impact-Finance/intheory-mobile-nft-mint-celo)](https://github.com/Impact-Finance/intheory-mobile-nft-mint-celo/blob/main/LICENSE) [![GitHub forks](https://img.shields.io/github/forks/Impact-Finance/intheory-mobile-nft-mint-celo)](https://github.com/Impact-Finance/intheory-mobile-nft-mint-celo/network) [![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FDeSci_Impact)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FImpact-Finance%2Fintheory-mobile-nft-mint-celo)

# inTheory Pre-Launch NFT Minting App

#### Built by [Impact Finance](https://impact-finance.io)

#### Hosted app can be found at [intheory.impact-finance.io](https://intheory.impact-finance.io)

#### Questions about this repo? Contact us at [info@impact-finance.io](mailto:info@impact-finance.io)

## Project description

This application allows users to select the scientific research topics that are of greatest interest to them and then uses that selection to create an AI-generated artwork that can be minted as an NFT on the Celo blockchain. Doing so creates a permanent record and verifier of their research interests and their support for open science. The selection of topics by the community will be used to influence the first wave of projects funded by the [inTheory DeSci platform](https://impact-finance.io/inTheory) when it launches.

This application could be repurposed by any early-stage web3 project that wants to create an engaging and verifiable way to poll community interest, without requiring a governance token. Also notice that **_this repo does not require smart contract dev skills or any knowledge of Solidity to operate_**, as it uses [Tatum](https://tatum.io/) for all blockchain interactions.

### Why did we build this?

We built this application to activate engagement from our early supporters and to provide a verifiable means for them to influence platform development prior to the launch of our governance token. It allows users to collect a piece of personalized digital artwork inspired by their selections, while giving us a clear gauge on community interest. This application also provides a mechanism for distributing rewards to our earliest supporters.

This application was built as part of our participation in [Celo Camp Batch 6](https://www.yahoo.com/now/announcing-celo-camp-batch-6-130100939.html).

### Where can you learn more?

inTheory: [Website](https://impact-finance.io/inTheory) | [Twitter](https://twitter.com/DeSci_Impact) | [LinkedIn](https://www.linkedin.com/company/impact-finance-desci/) | [Medium](https://medium.com/impact-finance)

DeSci: [ethereum.org/en/desci/](https://ethereum.org/en/desci/)

Celo: [Celo Blockchain](https://celo.org/)

## How to install and run

### Installation

```bash
# install dependencies
yarn install

# install Netlify CLI
npm install netlify-cli -g

# run with Netlify
netlify dev
```

### How does it work

This application is a [Next.js](https://nextjs.org/) app.

#### Netlify

This application is hosted on Netlify and uses Netlify functions to execute server-side code. These functions can be found in the **/netlify/functions** directory and can be moved to accommodate hosting on other services. Note that these functions often involve API calls requiring an API key and for security purposes, they should not be run from the client side. More information on Netlify's functions can be found [in their docs](https://docs.netlify.com/functions/overview/).

Note that the default timeout for Netlify functions is 10 seconds, which is likely too short for the Stable Diffusion API call. This default timeout can be extended by contacting Netlify support. You will then want to link your local repo to your Netlify app for testing during development by running `netlify link --name [my-site-name]`. More info [here](https://cli.netlify.com/commands/link/).

#### Stable Diffusion

This application uses the [Stable Diffusion](https://stability.ai/blog/stable-diffusion-public-release) model for creating AI-generated artworks. This API call can be found in **/netlify/functions/stability-call.js**. The API call sends a text prompt that includes the selected research topics, as well as some randomly generated stylistic elements from **/utils/randDescriptor.js** through [Replicate's AI service](https://replicate.com/stability-ai/stable-diffusion).

This repo also includes a function in **/netlify/functions/dream-call.js** for utilizing [WOMBO's Dream API](https://www.w.ai/dream-api) if that is preferred, though some additional configuration would be needed to correctly receive the image response. More information [here](https://wombo.gitbook.io/dream-docs/).

#### AWS S3

After the AI art generation is completed, all images are uploaded to an AWS S3 bucket for internal record keeping. Since the image is then immediately streamed to IPFS for creation of metadata, the S3 storage step could be skipped if desired.

#### Celo

This application was built to be used on the Celo blockchain and uses [react-celo](https://github.com/celo-org/react-celo) to connect user wallets. Celo is an EVM compatible chain, and so this hook could be easily replaced with a wallet connection function of your choice (such as [RainbowKit](https://www.rainbowkit.com/) or [Dynamic](https://www.dynamic.xyz/)) for launching on other EVM chains.

**_Also note that this app could easily be adapted to not require users to connect their wallets at all._** Since blockchain interactions are handled through Tatum, it is possible to mint an NFT to a user by just collecting their wallet address through a React form and submitting the address to the Tatum API. We chose not to do this, as we wanted to verify our users' ownership over their wallets.

For testing, the following config should be added in **\_app.js** to make the Celo Alfajores Testnet the default network.

```
import { CeloProvider, NetworkNames } from '@celo/react-celo';
import '@celo/react-celo/lib/styles.css';

<CeloProvider
    ...
    defaultNetwork={NetworkNames.Alfajores}
    >
    <App />
</CeloProvider>
```

#### Pinata

We use [Pinata](https://www.pinata.cloud/) for pinning images and NFT metadata to IPFS. The API call to do so can be found in **/netlify/functions/ipfs-stream.js**. This function contains the NFT metadata schema that should be adjusted for your specific use case.

Our Pinata dedicated gateway is also used in **/components/Done.js** for displaying NFT metadata. Our dedicated gateway will only serve files pinned to our Pinata account, and so the URL will need to be reconfigured to function for your application.

#### Tatum

We use the [Tatum API](https://tatum.io/) for all communication with the blockchain. This allows us to avoid using Solidity to deploy our own smart contracts and allows us to pay gas fees for minting NFTs, providing a better user experience.

**The Tatum API calls that we utilize are:**

-[Deploy an NFT Smart Contract](<https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftDeployErc721>) (not done in app, performed only once to create NFT minting contract)

-[Add an NFT Minter](<https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftAddMinter>) (not done in app, performed only once to allow Tatum to mint NFTs using our contract)

-[Get NFTs from a Collection](<https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetTokensByCollectionErc721>) (done in app to query number of NFTs minted to date, which helps us set token ID - _more info below_)

-[Get the NFTs from a Specific Smart Contract that a Blockchain Address Holds](<https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetBalanceErc721>) (done to verify that only one NFT is being minted per blockchain address)

-[Minting NFTs with NFT Express Using your own Smart Contract](<https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721>) (done to mint NFTs using our deployed smart contract)

**Note on token IDs:**
To increase early demand, we elected to have the first 50 NFTs minted to our collection have a tokenID ranging from 1-50. After the 50th NFT has been minted, all future NFTs will have an arbitrary tokenID (generated by `Date.now()`). This provides a simple mechanism to mark the earliest NFTs minted in the collection and increase their value above the others.

### Environment variables

The environment variables required for this application are below.

```
DREAM_API_KEY    //only required if using Dream for image gen
REPLICATION_STABILITY_API_KEY   //only required if using Stable Diffusion for image gen
PINATA_JWT
s3AccessKeyId
s3AccessSecret
s3Region
s3Bucket
TATUM_API_KEY
contractAddress   //contract address of your ERC-721 NFT smart contract
```

## License

This source code is licensed under the Apache-2.0 license found in the LICENSE file in the root directory of this source tree.
