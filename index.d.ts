import { Inquirer } from 'inquirer';
import * as CommonBin from 'common-bin';
import { Consola } from 'consola';

declare namespace CommonBinPlus {
  export class Logger extends Consola {}
  export interface OptionDesc {
    type: string;
    description: string;
  }

  export interface Options {
    [key: string]: OptionDesc;
    verbose: OptionDesc;
  }
}

declare class CommonBinPlus<T extends CommonBin.Context = CommonBin.Context> extends CommonBin {
  /**
   * Prompt function that takes a "question" object or array of question objects, and returns an object with responses from the user.
   *
   * @param {Array|Object} questions - Options objects for one or more prompts to run.
   * @return {Promise<Object>} Promise that returns an "answers" object with the user's responses.
   * @see https://github.com/SBoudrias/Inquirer.js
   */
  prompt: Inquirer['prompt'];

  /**
   * built-in logger
   */
  logger: CommonBinPlus.Logger;

  /**
   * provide common line args definition to yargs
   * @return {Object} options
   * @protected
   */
  protected initOptions(): CommonBinPlus.Options;

  /**
   * if you want to custom it, override `initContext`
   * @private
   */
  readonly context: T;

  /**
   * custom your context, origin getter of context will be freeze, here is the only way to customize it.
   *
   * @param {Object} context - super's context
   * @return {Object} context obj
   * @protected
   */
  protected initContext(ctx: CommonBin.Context): T;
}

export = CommonBinPlus;
