'use strict';

const testUtils = require('./test_utils');

describe('test/logger.test.js', () => {

  it('should work', () => {
    return testUtils.run('logger')
      // .debug()
      .notExpect('stdout', /\[MyCommand\] hello debug level/)
      .expect('stdout', /\[MyCommand\] hello info level/)
      .expect('stdout', /\[MyCommand\] hello log level/)
      .expect('stderr', /\[MyCommand\] hello warn level/)
      .expect('stderr', /\[MyCommand\] Error: hello error level\s*\n.*at MyCommand.run/)
      .expect('code', 0)
      .end();
  });

  it('should log debug with --verbose', () => {
    return testUtils.run('logger', { args: [ '--verbose' ] })
      // .debug()
      .expect('stdout', /\[MyCommand\] hello debug level/)
      .expect('stdout', /\[MyCommand\] hello info level/)
      .expect('stdout', /\[MyCommand\] hello log level/)
      .expect('stderr', /\[MyCommand\] hello warn level/)
      .expect('stderr', /\[MyCommand\] Error: hello error level\s*\n.*at MyCommand.run/)
      .expect('code', 0)
      .end();
  });

  it('should log debug with ENV', () => {
    return testUtils.run('logger', { opt: { env: { DEBUG: 'CLI' } } })
      // .debug()
      .expect('stdout', /\[MyCommand\] hello debug level/)
      .expect('stdout', /\[MyCommand\] hello info level/)
      .expect('stdout', /\[MyCommand\] hello log level/)
      .expect('stderr', /\[MyCommand\] hello warn level/)
      .expect('stderr', /\[MyCommand\] Error: hello error level\s*\n.*at MyCommand.run/)
      .expect('code', 0)
      .end();
  });
});
