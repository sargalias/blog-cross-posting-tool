import { mkdir, readFile, rmdir, unlink, writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import transformFile from './transformFile.js';

const directoryPath = resolve(dirname('.'), '.temp');
const inputPath = resolve(directoryPath, 'input.md');
const mapperPath = resolve(directoryPath, 'mapper.json');
const outputPath = resolve(directoryPath, 'output.md');

const input = `---
title: Hello commander
---

# Heading 2

[](./link)
[](/articles)
Foo


Hey everyone
`;

const mapper = `
{
    "general": {
        "exactReplace": {
            "./link": "/bar",
            "Foo": "Bar"
        },
        "rootRelativeUrlsPrefix": "https://example.com"
    }
}
`;

const expected = `---
title: Hello commander
---

# Heading 2

[](https://example.com/bar)
[](https://example.com/articles)
Bar


Hey everyone
`;

const setup = async () => {
  const setupTempDirectory = async () => {
    await mkdir(directoryPath);
  };
  const setupInputFile = async () => {
    await writeFile(inputPath, input);
  };
  const setupMapperFile = async () => {
    await writeFile(mapperPath, mapper);
  };
  await setupTempDirectory();
  return Promise.all([setupInputFile(), setupMapperFile()]);
};

const tearDown = async () => {
  const p1 = unlink(inputPath);
  const p2 = unlink(mapperPath);
  const p3 = unlink(outputPath);
  await Promise.allSettled([p1, p2, p3]);
  const p4 = rmdir(directoryPath);
  await Promise.allSettled([p4]);
};

beforeEach(() => {
  return tearDown().then(setup);
});

afterEach(async () => {
  return tearDown();
});

describe('transformFile', () => {
  test('', async () => {
    const transformers = ['general'];

    await transformFile({
      inputPath,
      mapperPath,
      transformers,
      outputPath,
    });

    const output = await readFile(outputPath, 'utf-8');
    expect(output).toBe(expected);
  });
});
