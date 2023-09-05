/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      BASE_URL: process.env.BASE_URL,
    },
    images: {
      domains: ['images.unsplash.com']
    }
}

module.exports = nextConfig
