const api = require('./cjs/index.js');

module.exports = Object.assign(function Perplexity(...args) {
  return new api.default(...args);
}, api);
