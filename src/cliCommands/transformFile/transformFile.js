import { dirname, resolve } from 'path';
import { readFile, writeFile, mkdir } from 'fs/promises';
import transformMany from '../../utilities/transformMany/transformMany.js';

const transformFile = async ({
  inputPath,
  mapperPath,
  transformers,
  outputPath,
}) => {
  const [input, mapper] = await Promise.all([
    _parseInputFile(inputPath),
    _parseMapperFile(mapperPath),
  ]);
  const transformMaps = transformers.map((transformer) => mapper[transformer]);

  const result = transformMany(input, transformMaps);

  if (outputPath) {
    await _writeToFile(outputPath, result);
  } else {
    console.log(result);
  }
};

const _parseInputFile = async (path) => {
  const data = await readFile(path, 'utf-8');
  return data;
};

const _parseMapperFile = async (path) => {
  const data = await readFile(path, 'utf-8');
  return JSON.parse(data);
};

const _writeToFile = async (path, content) => {
  const directoryPath = dirname(path);
  try {
    await mkdir(directoryPath, { recursive: true });
    await writeFile(path, content);
    console.log(`Created file at ${resolve(path)}`);
  } catch (error) {}
};

export default transformFile;
