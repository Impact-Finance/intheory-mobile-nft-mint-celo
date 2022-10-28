const axios = require('axios');
const fetch = require('node-fetch');

exports.handler = async function tatumMint(event, context) {
  try {
    const { metadataCID, wallet } = event.queryStringParameters;
    const TATUM_API_KEY = process.env.TATUM_API_KEY;

    const chain = 'CELO';
    const contractAddress = process.env.contractAddress;
    const minter = '0x49678AAB11E001eb3cB2cBD9aA96b36DC2461A94';
    const metaUrl = `ipfs://${metadataCID}`;

    const getResp = await fetch(
      `https://api-eu1.tatum.io/v3/nft/collection/${chain}/${contractAddress}?pageSize=50`,
      {
        method: 'get',
        headers: {
          'x-api-key': TATUM_API_KEY,
        },
      }
    );

    const totalNFTs = await getResp.json();

    const calcId = () => {
      if (totalNFTs.length >= 50) {
        return Date.now();
      } else {
        return totalNFTs.length + 1;
      }
    };

    const tokenId = calcId();

    const postConfig = {
      method: 'post',
      url: 'https://api-eu1.tatum.io/v3/nft/mint',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TATUM_API_KEY,
      },
      data: {
        chain,
        to: wallet,
        url: metaUrl,
        contractAddress,
        tokenId,
        minter,
      },
    };
    if (!postConfig.data.url) {
      throw 'No link to metadata found!';
    }
    while (true === true) {
      const queryConfig = {
        method: 'get',
        url: `https://api-eu1.tatum.io/v3/ipfs/${metadataCID}`,
        headers: {
          'x-api-key': TATUM_API_KEY,
          Connection: 'keep-alive',
        },
      };
      // console.log(queryConfig.url);
      const queryIPFS = await axios(queryConfig)
        .then(res => {
          console.log('SUCCESS');
          console.log(res.data);
          return true;
        })
        .catch(err => {
          console.log(`${err.response.status} ${err.response.statusText}`);
          return false;
        });

      console.log(`Data found on IPFS: ${queryIPFS}`);

      if (!queryIPFS) {
        await new Promise(res => setTimeout(res, 100));
        continue;
      } else {
        const txnID = await axios(postConfig).then(res => {
          return res.data.txId;
        });
        return {
          statusCode: 200,
          body: JSON.stringify({ txnID, tokenId }),
        };
      }
    }
  } catch {
    return {
      statusCode: 404,
      body: JSON.stringify({ txnID: '', tokenId: '' }),
    };
  }
};
