'use strict';

const inform = require('../lib/inform');
const shell = require('shelljs');

const cleanPaths = [
  './dist/*',
  './dist/\.*'
];

module.exports = function(event, paths) {
  inform.start('Cleaning Up');
  cleanPaths.forEach(path => {
    inform.msg(`\nRemoving ${ path }`);
    shell.rm('-rf', path);
  });
  return inform.done();
};
