'use strict';

const Command = require('../../../');

class MyCommand extends Command {
  async run() {
    this.cliName = 'MyCommand';

    this.logger.info('hello info level');
    this.logger.log('hello log level');
    this.logger.warn('hello warn level');
    this.logger.error(new Error('hello error level'));
    this.logger.debug('hello debug level');
  }
}

module.exports = MyCommand;
