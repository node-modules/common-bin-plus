'use strict';

const Command = require('../../../');

class MyCommand extends Command {

  async run() {
    this.cliName = 'MyCommand';

    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      }, {
        type: 'select',
        name: 'type',
        message: 'Choose a boilerplate',
        choices: [ 'empty', 'simple', 'plugin', 'framework' ],
      },
    ]);

    this.logger.info(answers);
  }
}

module.exports = MyCommand;
