#!/usr/bin/env node
import './setupDotEnvConfig.js';
import yargs from 'yargs';
import transformFile from './cliCommands/transformFile/transformFile.js';

const y = yargs(process.argv.slice(2))
  .usage(
    'Usage: $0 transform <source> [destination] [--transformers general website] [--mapper=mapper.json]',
  )
  .command('transform', 'transform a file')
  .example('$0 transform input.md --transformers general website')
  .alias('m', 'mapper')
  .default('m', './mapper.json')
  .array('t')
  .alias('t', 'transformers')
  .default('t', ['general']);

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

if (argv._[0] === 'transform') {
  await transform();
}
