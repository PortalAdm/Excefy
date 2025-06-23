const path = require('path');

const nextConfig = {
  images: {
  domains: ['images.unsplash.com']
  },
  swcMinify: false,
  webpack(config) {
    config.resolve.alias['@codemirror/state'] = path.resolve(
      __dirname,
      'node_modules/@codemirror/state'
    );

    config.resolve.alias['@codemirror/view'] = path.resolve(
      __dirname,
      'node_modules/@codemirror/view'
    );

    config.resolve.alias['@codemirror/language'] = path.resolve(
      __dirname,
      'node_modules/@codemirror/language'
    );

    return config;
  }
}

module.exports = nextConfig
