'use strict';

const testUtils = require('./test_utils');

describe('test/index.test.js', () => {

  it('should work', () => {
    return testUtils.run('prompt')
      .debug()
      .write('tz\n')
      .writeKey('DOWN', 'ENTER')
      .expect('stdout', /{ name: 'tz', type: 'simple' }/)
      .expect('code', 0)
      .end();
  });
});
