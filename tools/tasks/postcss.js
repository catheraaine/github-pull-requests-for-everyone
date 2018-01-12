'use strict';

const inform = require('../lib/inform');
const shell = require('shelljs');

const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = function($event, $path) {
  inform.start('Running Postcss');
  shell.exec('postcss -c ./tools/config/postcss.js');
  return inform.done();
};
