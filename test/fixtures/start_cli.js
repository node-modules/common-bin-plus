#!/usr/bin/env node

'use strict';

const path = require('path');

let cli = process.env.TEST_UTILS_CLI;

// npm run fixtures --test_utils_cli=normal
if (!cli && process.env.npm_config_test_utils_cli) {
  cli = process.env.TEST_UTILS_CLI = path.join(process.cwd(), 'test/fixtures', process.env.npm_config_test_utils_cli);
}

if (!path.isAbsolute(cli)) cli = path.join(process.cwd(), cli);
const Command = require(cli);

new Command().start();
