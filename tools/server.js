'use strict';

const pkg = require('../package.json');
const server = require('browser-sync').create(pkg.name);
const middleware = require('./middleware');

module.exports = function(options, tasks) {

  let proxy = options.proxy || 'reveal.dev';
  let port = options.port || pkg.config.port || 4000;
  let tunnel = options.tunnel || false;
  let https = options.ssl ? { key: './livereload.key', cert: './livereload.crt' } : false;

  let sharedSettings = {
    port: port,
    tunnel: tunnel,
    https: https,
    files: tasks,
    logPrefix: pkg.name,
    open: false,
    snippetOptions: {
      rule: {
        match: /<\/body>/i,
        fn(snippet, match) {
          return snippet + match;
        }
      }
    }
  };

  let proxyServer = Object.assign({
    proxy: proxy
  }, sharedSettings);

  let staticServer = Object.assign({
    server: { baseDir: 'dist' },
    middleware: middleware
  }, sharedSettings);

  return server.init( options.static ? staticServer : proxyServer );
};
