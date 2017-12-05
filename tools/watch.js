'use strict';

const tasks = require('./lib/all-tasks');

// Chokidar options
// https://github.com/paulmillr/chokidar/#api
const defaultOptions = { ignoreInitial: true };

module.exports = [
  {
    match: ['./src/public/**/*'],
    fn($event, $path) {
      tasks.copy($event, $path);
    },
    options: defaultOptions
  },
  {
    match: ['./src/styles/**/*.scss'],
    fn($event, $path) {
      tasks.sass($event, $path);
      tasks.postcss($event, $path);
    },
    options: defaultOptions
  },{
    match: [
      './src/decks/**/*.hbs',
      './src/layouts/**/*.hbs',
      './src/partials/**/*.hbs',
      'src/slides/**/*.yaml'],
    fn() {
      tasks.html();
      this.reload();
    },
    options: defaultOptions
  }
];
