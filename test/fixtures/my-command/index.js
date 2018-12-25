'use strict';

const Command = require('../../../');

class MyCommand extends Command {
  initOptions() {
    const opts = super.initOptions();
    opts.test = {
      type: 'string',
      description: 'some argv',
      alias: 't',
    };
    return opts;
  }

  initContext(context) {
    context.hello = true;
    return context;
  }

  async run(context) {
    this.cliName = 'MyCommand';

    this.logger.info('context:', this.context === this.context, this.context === context); // eslint-disable-line no-self-compare
    this.logger.info('test:', context.argv.test);
    this.logger.info('alias:', context.argv.t);
    this.logger.info('hello:', context.hello);
  }
}

module.exports = MyCommand;
