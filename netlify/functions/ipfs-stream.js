// const axios = require('axios');
const fetch = require('node-fetch');
// var FormData = require('form-data');
// var form = new FormData();
var { NFTStorage } = require('nft.storage');

exports.handler = async function (event, context) {
  //   try {
  const { topics, s3url } = event.queryStringParameters;
  const PINATA_API_KEY = process.env.PINATA_API_KEY;
  const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;
  const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY;
  const pinataUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const imageCID = 'QmSE8qwZYCNWtPfh2Z5D24PKE1bFSp7LDVTdKTgc7GiGUf';

  const imageBlob = await fetch(s3url).then(function (response) {
    return response.blob();
  });

  console.log(imageBlob);

  //   let blob = new Blob()

  //   const nft = {
  //     image, // use image Blob as `image` field
  //     name: 'inTheory Pre-Launch NFT',
  //     description:
  //       'This NFT verifies the holder as a supporter of decentralized science. All holders of an inTheory pre-launch NFT are entitled to exclusive benefits when inTheory launches in 2023.',
  //     properties: {
  //       creator: [{ name: 'Impact Finance' }],
  //       researchTopics: topics,
  //     },
  //   };

  return {
    statusCode: 200,
    body: JSON.stringify({
      metadataCID: true,
    }),
  };
  //   } catch {
  return {
    statusCode: 404,
    body: JSON.stringify({ metadataCID: false }),
  };
};
// };
