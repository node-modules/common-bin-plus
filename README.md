# common-bin-plus

advanced [common-bin](https://github.com/node-modules/common-bin) for cli usage

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/common-bin-plus.svg?style=flat-square
[npm-url]: https://npmjs.org/package/common-bin-plus
[travis-image]: https://img.shields.io/travis/node-modules/common-bin-plus.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/common-bin-plus
[codecov-image]: https://codecov.io/gh/node-modules/common-bin-plus/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/node-modules/common-bin-plus
[david-image]: https://img.shields.io/david/node-modules/common-bin-plus.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/common-bin-plus
[snyk-image]: https://snyk.io/test/npm/common-bin-plus/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/common-bin-plus
[download-image]: https://img.shields.io/npm/dm/common-bin-plus.svg?style=flat-square
[download-url]: https://npmjs.org/package/common-bin-plus

## Installation

```bash
npm i common-bin-plus --save
```

## Write your own cli

see [common-bin](https://github.com/node-modules/common-bin) for more details.

## Feature

### Logger

https://github.com/unjs/consola

```js
this.logger.info('hello info level');
this.logger.warn('hello warn level');
this.logger.error(new Error('hello error level'));
this.logger.debug('hello debug level');
```

`debug` log is disabled by default, you could enable it by:

- command line argv: `--verbose`
- process env: `DEBUG=*` or `DEBUG=${cliName}`
- programmatically: `logger.level = 'DEBUG'`

## Prompt

```js
const answers = await this.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name:',
  }, {
    type: 'list',
    name: 'type',
    message: 'Choose a boilerplate:',
    choices: [ 'empty', 'simple', 'plugin', 'framework' ],
  },
], {});

this.logger.info(answers);
```

## Unit Testing

Use [coffee](https://github.com/node-modules/coffee) :

```js
const coffee = require('coffee');

describe('test/index.test.js', () => {
  it('should work', () => {
    return coffee.fork('/path/to/cli')
      // .debug()
      .waitForPrompt()
      .write('tz\n')
      .writeKey('DOWN', 'ENTER')
      .write('this is a desc\n')
      .expect('stdout', /{ name: 'tz', type: 'simple' }/)
      .expect('stdout', /{ description: 'this is a desc' }/)
      .expect('code', 0)
      .end();
  });
}):
```
