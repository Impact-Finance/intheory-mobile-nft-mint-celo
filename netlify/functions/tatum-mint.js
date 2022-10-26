const axios = require('axios');

exports.handler = async function tatumMint(event, context) {
  try {
    const { metadataCID, wallet } = event.queryStringParameters;
    const TATUM_API_KEY = process.env.TATUM_API_KEY;

    const chain = 'CELO';
    const tokenId = Date.now();
    const contractAddress = process.env.contractAddress;
    const minter = '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F';
    const metaUrl = `ipfs://${metadataCID}`;

    const config = {
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
    const txnID = await axios(config).then(res => {
      return res.data.txId;
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ txnID }),
    };
  } catch {
    return {
      statusCode: 404,
      body: JSON.stringify({ txnID: false }),
    };
  }
};
