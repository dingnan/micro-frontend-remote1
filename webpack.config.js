const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/inline',
        resourceQuery: /inline/, // Apply to SVGs imported with ?inline
        generator: {
          dataUrl: {
            encoding: 'base64',
            mimetype: 'image/svg+xml'
          }
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        resourceQuery: { not: [/inline/] }, // Regular loading for other SVGs
        generator: {
          filename: 'assets/svg/[name].[hash:8][ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.svg']
  }
};
