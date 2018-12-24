'use strict';

const testUtils = require('./test_utils');

describe('test/index.test.js', () => {

  it.only('should work', () => {
    return testUtils.run('prompt')
      .debug()
      .waitForPrompt()
      .write('tz\n')
      .writeKey('ENTER')
      .expect('stdout', /{}/)
      .expect('code', 0)
      .end();
  });
});
