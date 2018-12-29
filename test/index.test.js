'use strict';

const path = require('path');
const coffee = require('coffee');

describe('test/index.test.js', () => {
  const fixtures = path.join(__dirname, 'fixtures');

  it('should work', () => {
    return coffee.fork(`${fixtures}/my-command/bin/cli.js`, [ '--test=abc' ])
      // .debug()
      .expect('stdout', /\[MyCommand\] context: true true/)
      .expect('stdout', /\[MyCommand\] test: abc/)
      .expect('stdout', /\[MyCommand\] alias: undefined/)
      .expect('stdout', /\[MyCommand\] hello: true/)
      .expect('code', 0)
      .end();
  });

  it('should handler error', () => {
    return coffee.fork(`${fixtures}/error/bin/cli.js`)
      // .debug()
      .expect('stderr', /\[MyCommand\] Error: oh, an error\s*\n.*at MyCommand.run/)
      .expect('code', 1)
      .end();
  });

  it('should compile ts without error', () => {
    return coffee.fork(
      require.resolve('typescript/bin/tsc'),
      [ '-p', path.resolve(__dirname, './fixtures/ts/tsconfig.json') ]
    )
      // .debug()
      .expect('code', 0)
      .end();
  });
});
