'use strict';

const path = require('path');
const inform = require('./inform');
const tasks = process.argv.slice(2);

tasks.forEach((task) => {
  try {
    let taskPath = path.resolve(`./tools/tasks/${ task }`);
    let run = require(taskPath);
    run();
  } catch(e) {
    inform.err(e.code);
    inform.msg(e.message);
    process.exitCode = 1;
  }
});
