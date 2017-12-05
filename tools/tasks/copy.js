'use strict';

const inform = require('../lib/inform');
const shell = require('shelljs');

const copyPaths = [
  { from: './src/public/*', to: './dist' },
  { from: './src/public/\.*', to: './dist' }
];

module.exports = function(event, paths) {
  inform.start('Copying Files');
  copyPaths.forEach(path => {
    inform.msg(`\nCopying ${ path.from } ---> ${ path.to }`);
    shell.mkdir('-p', path.to);
    shell.cp('-r', path.from, path.to);
  });
  return inform.done();
};
