'use strict';

const path = require('path');
const globby = require('globby');
const inform = require('../lib/inform');
const sass = require('node-sass');
const shell = require('shelljs');

const PRODUCTION = process.env.NODE_ENV === 'production';

const PATHS = {
  src: globby.sync('./src/styles/**/!(_)*.scss'),
  dest: './dist/css'
};

const getDest = (file) => {
  let fileName = path.basename(file, '.scss');
  return path.join(PATHS.dest, fileName) + '.css';
};

module.exports = function($event, $path) {
  inform.start('Compiling Sass');
  let outputStyle = '--output-style ' + (PRODUCTION ? 'compressed' : 'expanded');
  PATHS.src.forEach((file) => {
    let dest = getDest(file);
    shell.exec(`node-sass ${ file } ${ outputStyle } ${ dest }`);
  });
  return inform.done();
};
