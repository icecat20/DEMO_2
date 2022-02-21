'use strict';
const fg = require('fast-glob');
const path = require('path');
const _ = require('lodash');

const patterns = [
  './**/**/routers.js',
  './upload/routers.js',
];

const config = { dot: true };

const routes =
  _.chain(fg.sync(patterns, config))
    .map((file) => require(path.resolve(file)))
    .flattenDeep()
    .value();

module.exports = routes;
