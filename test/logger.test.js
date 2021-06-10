'use strict';

const path = require('path');
const coffee = require('coffee');

describe('test/logger.test.js', () => {
  const fixtures = path.join(__dirname, 'fixtures');
  const bin = path.join(fixtures, 'logger/bin/cli.js');

  it('should work', () => {
    return coffee.fork(bin)
      .debug()
      .notExpect('stdout', /\[MyCommand\] hello debug level/)
      .expect('stdout', /\[MyCommand\] hello info level/)
      .expect('stdout', /\[MyCommand\] hello log level/)
      .expect('stderr', /\[MyCommand\] hello warn level/)
      .expect('stderr', /\[MyCommand\] hello error level\s*\n.*at MyCommand.run/)
      .expect('code', 0)
      .end();
  });

  it('should log debug with --verbose', () => {
    return coffee.fork(bin, [ '--verbose' ])
      .debug()
      .expect('stdout', /\[MyCommand\] hello debug level/)
      .expect('stdout', /\[MyCommand\] hello info level/)
      .expect('stdout', /\[MyCommand\] hello log level/)
      .expect('stderr', /\[MyCommand\] hello warn level/)
      .expect('stderr', /\[MyCommand\] hello error level\s*\n.*at MyCommand.run/)
      .expect('code', 0)
      .end();
  });

  it('should log debug with ENV', () => {
    return coffee.fork(bin, [], { env: { DEBUG: 'MyCommand', NODE_ENV: 'test' } })
      .debug()
      .expect('stdout', /\[MyCommand\] hello debug level/)
      .expect('stdout', /\[MyCommand\] hello info level/)
      .expect('stdout', /\[MyCommand\] hello log level/)
      .expect('stderr', /\[MyCommand\] hello warn level/)
      .expect('stderr', /\[MyCommand\] hello error level\s*\n.*at MyCommand.run/)
      .expect('code', 0)
      .end();
  });

  it('should log debug with ENV multi', () => {
    return coffee.fork(bin, [], { env: { DEBUG: 'common-bin,MyCommand', NODE_ENV: 'test' } })
      .debug()
      .expect('stdout', /\[MyCommand\] hello debug level/)
      .expect('stdout', /\[MyCommand\] hello info level/)
      .expect('stdout', /\[MyCommand\] hello log level/)
      .expect('stderr', /\[MyCommand\] hello warn level/)
      .expect('stderr', /\[MyCommand\] hello error level\s*\n.*at MyCommand.run/)
      .expect('code', 0)
      .end();
  });

  it('should log debug with ENV *', () => {
    return coffee.fork(bin, [], { env: { DEBUG: '*', NODE_ENV: 'test' } })
      .debug()
      .expect('stdout', /\[MyCommand\] hello debug level/)
      .expect('stdout', /\[MyCommand\] hello info level/)
      .expect('stdout', /\[MyCommand\] hello log level/)
      .expect('stderr', /\[MyCommand\] hello warn level/)
      .expect('stderr', /\[MyCommand\] hello error level\s*\n.*at MyCommand.run/)
      .expect('code', 0)
      .end();
  });

  it('should not log debug', () => {
    return coffee.fork(bin, [], { env: { DEBUG: 'CLI_TEST', NODE_ENV: 'test' } })
      .debug()
      .notExpect('stdout', /\[MyCommand\] hello debug level/)
      .expect('code', 0)
      .end();
  });
});
