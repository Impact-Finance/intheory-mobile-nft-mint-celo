/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    DREAM_API_KEY: process.env.DREAM_API_KEY,
    REPLICATION_STABILITY_API_KEY: process.env.REPLICATION_STABILITY_API_KEY,
    NFT_STORAGE_API_KEY: process.env.NFT_STORAGE_API_KEY,
    PINATA_JWT: process.env.PINATA_JWT,
  },
};

module.exports = nextConfig;
