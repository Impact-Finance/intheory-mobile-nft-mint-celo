// const fetch = require('node-fetch');
const axios = require('axios');
// const FormData = require('form-data');
const fs = require('fs');
// var data = new FormData();
const { v4: uuid } = require('uuid');

exports.handler = async function (event, context) {
  // try {
  const { topics, imageUrl } = event.queryStringParameters;

  await axios({
    method: 'get',
    url: imageUrl,
    responseType: 'stream',
  }).then(response => {
    response.data.pipe(
      fs.createWriteStream(`public/images/NFTs/img-${uuid()}.png`)
    );
    console.log('image saved!');
  });

  // data.append('NFTimage.png', stream, {
  //   filename: 'NFTimage.png',
  // });

  // var config = {
  //   method: 'post',
  //   url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
  //   headers: {
  //     Authorization: `Bearer ${process.env.PINATA_JWT}`,
  //     ...data.getHeaders(),
  //   },
  //   data: data,
  // };

  // const res = await axios(config);
  // console.log(res);

  return {
    statusCode: 200,
    body: JSON.stringify({
      metadataCID: true,
    }),
  };
  // } catch {
  return {
    statusCode: 404,
    body: JSON.stringify({ metadataCID: false }),
  };
};
// };
