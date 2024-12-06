/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // protocol: 'https',
        hostname: process.env.NEXT_IMAGE_DOMAIN,
        // port: '',
        // pathname: '/sites/default/files/**',
      },
      {
        hostname: 'laaha.org'
      }
    ],
    localPatterns: [{
      pathname: '/assets/images/**',
      search: ''
    }]
  },
}
module.exports = withNextIntl(nextConfig);
