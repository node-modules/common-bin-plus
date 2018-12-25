'use strict';

const testUtils = require('./test_utils');

describe('test/index.test.js', () => {

  it('should work', () => {
    return testUtils.run('my-command', { args: [ '--test=abc' ] })
      // .debug()
      .expect('stdout', /\[MyCommand\] context: true true/)
      .expect('stdout', /\[MyCommand\] test: abc/)
      .expect('stdout', /\[MyCommand\] alias: undefined/)
      .expect('stdout', /\[MyCommand\] hello: true/)
      .expect('code', 0)
      .end();
  });

  it('should handler error', () => {
    return testUtils.run('error')
      // .debug()
      .expect('stderr', /\[MyCommand\] Error: oh, an error\s*\n.*at MyCommand.run/)
      .expect('code', 1)
      .end();
  });
});
