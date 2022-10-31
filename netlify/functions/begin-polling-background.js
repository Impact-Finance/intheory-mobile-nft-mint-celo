const axios = require('axios');

exports.handler = async function tatumMint(event, context) {
  try {
    const { metadataCID } = event.queryStringParameters;
    const TATUM_API_KEY = process.env.TATUM_API_KEY;

    while (true === true) {
      const queryConfig = {
        method: 'get',
        url: `https://api-eu1.tatum.io/v3/ipfs/${metadataCID}`,
        headers: {
          'x-api-key': TATUM_API_KEY,
          Connection: 'keep-alive',
        },
      };
      console.log(queryConfig.url);
      const queryIPFS = await axios(queryConfig)
        .then(res => {
          console.log('SUCCESS');
          console.log(res.data);
          console.log(`Data found on IPFS: ${queryIPFS}`);
          return true;
        })
        .catch(err => {
          console.log(`${err.response.status} ${err.response.statusText}`);
          return false;
        });

      if (!queryIPFS) {
        await new Promise(res => setTimeout(res, 7000));
        continue;
      } else {
        return {
          statusCode: 200,
        };
      }
    }
  } catch {
    return {
      statusCode: 404,
    };
  }
};
