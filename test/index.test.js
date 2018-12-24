'use strict';

const testUtils = require('..').TestUtils;

describe('test/index.test.js', () => {

  it('should work', () => {
    return testUtils.run('my-command', { args: [ '--test=abc' ] })
      .debug()
      .expect('stdout', /\[MyCommand\] › context: true true/)
      .expect('stdout', /\[MyCommand\] › test: abc/)
      .expect('stdout', /\[MyCommand\] › this is a warn/)
      .expect('stderr', /\[MyCommand\] › Error: this is an error\s*\n\s*at MyCommand.run/)
      .expect('code', 0)
      .end();
  });
});
