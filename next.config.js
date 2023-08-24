/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'henrique-pos-v1.s3.sa-east-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
