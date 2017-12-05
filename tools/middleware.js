'use strict';

// Rewrite URLs without .html to map to .html files
const rewriteModule = require('http-rewrite-middleware');
const rewriteMiddleware = rewriteModule.getMiddleware([
  { from: '(^((?!css|html|js|img|\/$).)*$)', to: '$1.html' }
]);

module.exports = [ rewriteMiddleware ];
