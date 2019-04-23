'use strict';

const Command = require('common-bin');
const Logger = require('zlogger');
const inquirer = require('inquirer');
const CONTEXT = Symbol('context');
const LOGGER = Symbol('logger');
const PROMPT = Symbol('prompt');

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
    process.nextTick(() => process.exit(1));
  }

  /**
   * Prompt function that takes a "question" object or array of question objects, and returns an object with responses from the user.
   *
   * @param {Array|Object} questions - Options objects for one or more prompts to run.
   * @return {Promise<Object>} Promise that returns an "answers" object with the user's responses.
   * @see https://github.com/SBoudrias/Inquirer.js
   */
  prompt(questions) {
    if (!this[PROMPT]) {
      // create a self contained inquirer module.
      this[PROMPT] = inquirer.createPromptModule();
      const promptMapping = this[PROMPT].prompts;
      for (const key of Object.keys(promptMapping)) {
        const Clz = promptMapping[key];
        // extend origin prompt instance to emit event
        promptMapping[key] = class CustomPrompt extends Clz {
          /* istanbul ignore next */
          static get name() { return Clz.name; }
          run() {
            process.send && process.send({ type: 'prompt', name: this.opt.name });
            process.emit('message', { type: 'prompt', name: this.opt.name });
            return super.run();
          }
        };
      }
    }
    return this[PROMPT](questions);
  }

  /**
   * built-in logger
   * @see https://github.com/node-modules/zlogger
   */
  get logger() {
    if (!this[LOGGER]) {
      const shouldLogDebug = this.context.argv.verbose || process.env.DEBUG === '*' || /\bCLI\b/.test(process.env.DEBUG);
      const logger = new Logger({
        prefix: this.cliName ? `[${this.cliName}] ` : '',
        time: false,
        level: shouldLogDebug ? 'DEBUG' : 'INFO',
      });

      this[LOGGER] = logger;
    }
    return this[LOGGER];
  }
}

module.exports = CommonBinPlus;
