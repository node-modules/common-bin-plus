'use strict';

const Command = require('common-bin');
const Logger = require('zlogger');
const Enquirer = require('enquirer');
const { ReadStream } = require('tty');
const CONTEXT = Symbol('context');
const LOGGER = Symbol('logger');

class CommonBinPlus extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    // it's a setter
    this.options = this._options = this.initOptions();

    this.parserOptions = {
      execArgv: true,
      removeAlias: true,
    };

    this.cliName = undefined;

    this.enquirer = new Enquirer();

    this.enquirer.on('prompt', instance => {
      const msg = { type: 'prompt', name: instance.name };
      process.send && process.send(msg);
      process.emit('message', msg);
    });
  }

  /**
   * provide common line args definition to yargs
   * @return {Object} options
   * @protected
   */
  initOptions() {
    return {
      verbose: {
        type: 'boolean',
        description: 'run at verbose mode, will print debug log',
        default: () => process.env.DEBUG === 'CLI',
      },
    };
  }

  /**
   * if you want to custom it, override `initContext`
   * @private
   */
  get context() {
    if (!this[CONTEXT]) {
      this[CONTEXT] = this.initContext(super.context);
    }
    return this[CONTEXT];
  }

  /**
   * custom your context, origin getter of context will be freeze, here is the only way to customize it.
   *
   * @param {Object} context - super's context
   * @return {Object} context obj
   * @protected
   */
  initContext(context) {
    return context;
  }

  /**
   * default error handler
   * @param {Error} err - err obj
   */
  errorHandler(err) {
    this.logger.error(err);
    process.exit(1);
  }

  /**
   * Prompt function that takes a "question" object or array of question objects, and returns an object with responses from the user.
   *
   * @param {Array|Object} questions - Options objects for one or more prompts to run.
   * @return {Promise<Object>} Promise that returns an "answers" object with the user's responses.
   * @see https://github.com/enquirer/enquirer
   */
  async prompt(questions) {
    let stdin = process.stdin;
    if (!stdin.isTTY) {
      stdin = new ReadStream(process.stdin.fd);
      process.stdin.pipe(stdin);
    }

    questions = Array.isArray(questions) ? questions : [ questions ];
    questions.forEach(question => {
      question.stdin = question.stdin || stdin;
    });

    const end = () => {
      stdin.end();
      process.stdin.unpipe(stdin);
      process.stdin.end();
    };

    return this.enquirer.prompt(questions)
      .then(result => {
        end();
        return result;
      })
      .catch(e => {
        end();
        throw e;
      });
  }

  /**
   * built-in logger
   * @see https://github.com/node-modules/zlogger
   */
  get logger() {
    if (!this[LOGGER]) {
      const logger = new Logger({
        prefix: this.cliName ? `[${this.cliName}] ` : '',
        time: false,
        // DEBUG=CLI
        level: this.context.argv.verbose ? 'DEBUG' : 'INFO',
      });

      this[LOGGER] = logger;
    }
    return this[LOGGER];
  }
}

module.exports = CommonBinPlus;
