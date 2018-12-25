'use strict';

const Command = require('../../../');

class MyCommand extends Command {
  async run() {
    this.cliName = 'MyCommand';

    throw new Error('oh, an error');
  }
}

module.exports = MyCommand;
