const { useEslintRc, override } = require('customize-cra');

module.exports = override(
  useEslintRc(),
);
