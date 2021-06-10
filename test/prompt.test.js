'use strict';

const path = require('path');
const coffee = require('coffee');

describe('test/index.test.js', () => {
  const fixtures = path.join(__dirname, 'fixtures');
  const bin = path.join(fixtures, 'prompt/bin/cli.js');

  it('should work', () => {
    return coffee.fork(bin)
      .debug()
      .waitForPrompt()
      .write('tz\n')
      .writeKey('DOWN', 'ENTER')
      .write('this is a desc\n')
      .expect('stdout', /{ silent: 'yes', name: 'tz', type: 'simple' }/)
      .expect('stdout', /{ description: 'this is a desc' }/)
      .expect('code', 0)
      .end();
  });
});
