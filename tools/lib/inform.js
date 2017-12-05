'use strict';

const colors = require('colors');

const timer = {
  startTime: null,
  endTime: null,
  start() {
    return this.startTime = Date.now();
  },
  stop() {
    return this.endTime = Date.now();
  },
  time() {
    return `\n--- DONE ${ (this.endTime - this.startTime) / 1000 } seconds ---`
  }
};

module.exports = {
  start(msg) {
    timer.start();
    return console.log('\n' + colors.bgBlue(` - ${ msg } - `).black);
  },
  msg(words) {
    return console.log(colors.magenta(words));
  },
  done(msg) {
    timer.stop()
    if(msg) console.log('\n' + msg);
    return console.log(timer.time());
  },
  err(msg) {
    return console.log(colors.bgRed(msg));
  }
};
