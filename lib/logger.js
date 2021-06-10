'use strict';

const enabled = require('enabled');
const env = require('std-env');
const consola = require('consola');
const { Consola, LogLevel, BasicReporter, FancyReporter, JSONReporter } = consola;
const LEVEL = Symbol('Logger#level');

class CIReporter extends BasicReporter {
  constructor(options = {}) {
    super({
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      ...options,
    });
  }

  formatLogObj(logObj) {
    const message = this.formatArgs(logObj.args);

    return this.filterAndJoin([
      this.formatDate(logObj.date),
      logObj.type.toUpperCase().padEnd(7),
      logObj.tag ? `[${logObj.tag}]` : '',
      message,
    ]);
  }
}

Object.defineProperty(LogLevel, 'normalize', {
  enumerable: false,
  value: level => {
    if (typeof level === 'number') return level;

    // 'WARN' => level.warn
    if (typeof level === 'string' && level) {
      return LogLevel[level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()];
    }
  },
});

class Logger extends Consola {
  constructor(options = {}) {
    const tag = options.defaults && options.defaults.tag;
    const level = LogLevel.normalize(options.level);

    // match rule `DEBUG=A:B:*` and set level if origin level is higher
    if (enabled(tag, process.env.DEBUG) && (!level || level < LogLevel.Debug)) {
      options.level = LogLevel.Debug;
    }

    super(options);

    if (env.ci || env.test) {
      this.setReporters(new CIReporter());
    } else {

      const reporter = new FancyReporter();
      reporter.options.formatOptions.date = options.time !== false;
      this.setReporters(reporter);
    }
  }

  set level(v) {
    this[LEVEL] = LogLevel.normalize(v);
  }

  get level() {
    return this[LEVEL];
  }

  _log(logObj) {
    // consola will tranform to lowercase, so let's revert it.
    logObj.tag = this._defaults.tag;
    super._log(logObj);
  }

  create(options) {
    return new Logger(Object.assign({
      reporters: this._reporters,
      level: this.level,
      types: this._types,
      defaults: this._defaults,
      stdout: this._stdout,
      stderr: this._stderr,
      mockFn: this._mockFn,
    }, options));
  }
}

Logger.LogLevel = LogLevel;
Logger.BasicReporter = BasicReporter;
Logger.FancyReporter = FancyReporter;
Logger.JSONReporter = JSONReporter;
Logger.CIReporter = CIReporter;

module.exports = Logger;
