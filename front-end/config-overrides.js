
const { override } = require('customize-cra');

module.exports = override(
  (config) => {
    // Override Webpack configuration here to disable crypto fallback
    config.resolve = {
      ...config.resolve,
      fallback: {
        crypto: false,  // Disable the crypto fallback
      },
    };
    return config;
  }
);
