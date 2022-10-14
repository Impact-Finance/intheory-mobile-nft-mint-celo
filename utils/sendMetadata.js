import { NFTStorage } from 'nft.storage';

export default async function sendMetadata(topics, imgURL) {
  const API_KEY = process.env.NFT_STORAGE_API_KEY;
  const blob = await fetch(imgURL).then(r => r.blob());
  const image = URL.createObjectURL(blob);
  //   const image = await objURL.decode();
  console.log(image);

  //   const nft = {
  //     image,
  //     name: 'inTheory pre-launch NFT',
  //     description:
  //       'The holder of this NFT has demonstrated their commitment to open access science.',
  //     properties: {
  //       topics,
  //       author: 'Impact Finance',
  //     },
  //   };
  //   const client = new NFTStorage({ token: API_KEY });
  //   const metadata = await client.store(nft);

  //   console.log('NFT data stored!');
  //   console.log('Metadata URI: ', metadata.url);
  //   URL.revokeObjectURL(objURL);
}
