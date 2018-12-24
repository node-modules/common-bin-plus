'use strict';

const Command = require('../../../');

class MyCommand extends Command {
  initOptions() {
    const opts = super.initOptions();
    opts.test = {
      type: 'string',
      description: 'some argv',
    };
    return opts;
  }

  async run(context) {
    this.cliName = 'MyCommand';

    this.logger.info('context:', this.context === this.context, this.context === context); // eslint-disable-line no-self-compare
    this.logger.info('test:', context.argv.test);
    this.logger.warn('this is a warn');
    this.logger.error(new Error('this is an error'));
    this.logger.debug('this is a debug');
  }
}

module.exports = MyCommand;
