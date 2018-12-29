import CommonBinPlus from '../../..';

const bin = new CommonBinPlus(['egg-bin', 'test']);

bin.prompt([
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
]);

bin.logger.error(new Error('test'));
console.info(bin.context.cwd);

// custom bin
class CustomBin extends CommonBinPlus {
  run() {
    super.run();
    console.info(this.initOptions().verbose.type);
    this.initContext(this.context);
  }
}

const customBin = new CustomBin(['egg-bin', 'test']);
customBin.start();