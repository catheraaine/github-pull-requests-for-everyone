'use strict';

const runAll = require("npm-run-all");

const tasks = [];

if (process.env.NODE_ENV === 'production') {
  tasks.push('server:prod');
} else {
  tasks.push('build');
  tasks.push('server:dev');
}

console.log(`Starting with ${tasks}`);

const options = {
  parallel: false,
  stdout: process.stdout,
  stderr: process.stderr
}

runAll(tasks, options)
  .then( () => console.log('✅ Done') )
  .catch( err => console.log(`🔥 Fail. ${err}`) );
