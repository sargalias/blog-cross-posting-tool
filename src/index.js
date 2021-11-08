#!/usr/bin/env node
import './setupDotEnvConfig.js';
import yargs from 'yargs';
import transformFile from './cliCommands/transformFile/transformFile.js';
import _newMapper from './cliCommands/newMapper/newMapper.js';

const y = yargs(process.argv.slice(2))
  .usage(
    `
Usage: transform <source> [destination] [--transformers general website] [--mapper=mapper.json]

Usage: new-mapper
`,
  )
  .command('transform', 'transform a file')
  .example('transform input.md --transformers general website')
  .alias('m', 'mapper')
  .default('m', './mapper.json')
  .array('t')
  .alias('t', 'transformers')
  .default('t', ['general'])
  .command('new-mapper', 'generate a new mock mapper file')
  .example('new-mapper');

const argv = y.argv;

const transform = async () => {
  const options = {
    inputPath: argv._[1],
    outputPath: argv._[2],
    mapperPath: argv.mapper,
    transformers: argv.transformers,
  };
  await transformFile(options);
};

const newMapper = async () => {
  const options = {
    path: './mapper.json',
  };
  await _newMapper(options);
};

if (argv._[0] === 'transform') {
  await transform();
} else if (argv._[0] === 'new-mapper') {
  newMapper();
} else {
  console.log('Command not recognised');
}
