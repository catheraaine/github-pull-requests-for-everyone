'use strict';

const path = require('path');
const fs = require('fs');

const taskFiles = fs.readdirSync('./tools/tasks');

module.exports = taskFiles
  .filter(task => /\.js$/.test(task))
  .reduce((hash, task) => {
    let taskName = path.basename(task, '.js');
    let taskPath = `../tasks/${task}`;
    hash[taskName] = require(taskPath);
    return hash;
  }, {});
