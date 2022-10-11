/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    DREAM_API_KEY: process.env.DREAM_API_KEY,
  },
};

module.exports = nextConfig;
