const { useEslintRc, enableEslintTypescript, override } = require('customize-cra');

module.exports = override(
  useEslintRc(),
  enableEslintTypescript(),
);
