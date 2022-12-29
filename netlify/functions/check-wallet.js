const axios = require('axios');

exports.handler = async function checkWallet(event, context) {
  try {
    const { wallet } = event.queryStringParameters;
    const TATUM_API_KEY = process.env.TATUM_API_KEY;
    const contractAddress = process.env.contractAddress;

    const checkValidWallet = async () => {
      const getConfig = {
        method: 'get',
        url: `https://api-eu1.tatum.io/v3/nft/balance/CELO/${contractAddress}/${wallet}`,
        headers: {
          'x-api-key': TATUM_API_KEY,
        },
      };
      const balance = await axios(getConfig).then(res => {
        return res.data.data;
      });
      if (balance.length > 0) {
        return true;
      } else {
        return false;
      }
    };

    const badAddress = await checkValidWallet();
    // const badAddress = false;
    console.log(`Bad address: ${badAddress}`);

    if (badAddress === true) {
      console.log('inTheory NFT detected in wallet.');
      return {
        statusCode: 200,
        body: JSON.stringify({
          badAddress: true,
        }),
      };
    } else {
      console.log('No inTheory NFT detected in wallet.');
      return {
        statusCode: 200,
        body: JSON.stringify({
          badAddress: false,
        }),
      };
    }
  } catch {
    return {
      statusCode: 404,
      body: JSON.stringify({
        badAddress: '',
      }),
    };
  }
};
