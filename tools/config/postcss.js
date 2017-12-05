'use strict';

const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  use: ['autoprefixer', 'css-mqpacker'],
  input: ['./dist/css/*.css'],
  replace: true,
  map: !PRODUCTION,
  autoprefixer: {
    browsers: [
      '> 1%',
      'last 4 versions',
      'Firefox > 20',
      'Firefox >= 20',
      'Firefox ESR',
      'Opera 12.1',
    ],
  },
  'css-mqpacker': {
    sort: true,
  },
};
