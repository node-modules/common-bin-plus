'use strict';

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const is = require('is-type-of');
const { Coffee } = require('coffee');

/**
 * run cli test
 *
 * ```js
 * await testUtils.run()
 *   .write('example\n')
 *   .writeKey('DOWN', 'ENTER')
 *   .end();
 * ```
 *
 * @param {String} [baseDir] - cli base dir, support relative path, default to `process.cwd()`
 * @param {Object} [options] - coffee options
 * @return {Coffee} return coffee instance
 */
exports.run = (baseDir, options) => {
  // support `testUtils.run('app')`
  if (is.string(baseDir)) {
    options = Object.assign({ baseDir }, options);
  } else {
    options = baseDir;
  }
  options = formatOptions(options);

  return new Coffee(options).waitForPrompt();
};

function formatOptions(options) {
  const defaults = {
    method: 'fork',
    baseDir: process.cwd(),
    tmpDir: path.join(process.cwd(), 'test/.tmp'),
    coverage: true,
  };
  options = Object.assign({}, defaults, options);

  // relative path to test/fixtures, `formatOptions({ baseDir: 'app' })` => `$PWD/test/fixtures/app`
  if (!path.isAbsolute(options.baseDir)) {
    options.baseDir = path.join(process.cwd(), 'test/fixtures', options.baseDir);
  }

  options.cmd = options.cmd || path.join(__dirname, 'start_cli.js');
  options.opt = options.opt || {};
  options.opt.cwd = options.opt.cwd || options.tmpDir;
  options.opt.env = options.opt.env || Object.assign({}, process.env);
  options.opt.env.TEST_UTILS_CLI = options.baseDir;

  assert(fs.existsSync(options.cmd), `${options.cmd} not exists`);
  return options;
}
