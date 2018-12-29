'use strict';

const Command = require('../../../');

class MyCommand extends Command {

  async run() {
    let answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name:',
      }, {
        type: 'list',
        name: 'type',
        message: 'Choose a boilerplate:',
        choices: [ 'empty', 'simple', 'plugin', 'framework' ],
      },
    ]);

    this.logger.info(answers);

    answers = await this.prompt({
      type: 'input',
      name: 'description',
      message: 'Description:',
    });

    this.logger.info(answers);
  }
}

module.exports = MyCommand;
