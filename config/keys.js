// keys.js - figure out what set of credentials to return

// we are in production
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./production');
} else {
  module.exports = require('./dev');
}