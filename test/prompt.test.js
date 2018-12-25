'use strict';

const testUtils = require('./test_utils');

describe('test/index.test.js', () => {

  it('should work', () => {
    return testUtils.run('prompt')
      // .debug()
      .write('tz\n')
      .writeKey('DOWN', 'ENTER')
      .write('this is a desc\n')
      .expect('stdout', /{ name: 'tz', type: 'simple' }/)
      .expect('stdout', /{ description: 'this is a desc' }/)
      .expect('code', 0)
      .end();
  });
});
