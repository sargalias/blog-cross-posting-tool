import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const newMapper = async ({ path }) => {
  const content = {
    platform1: {
      exactReplace: {
        foo: 'bar',
      },
      rootRelativeUrlsPrefix: 'https://example.com',
    },
    platform2: {
      exactReplace: {
        foo: 'bar',
      },
      rootRelativeUrlsPrefix: 'https://example.com',
    },
  };
  const json = JSON.stringify(content, null, 2);

  try {
    await writeFile(path, json);
    console.log(`Created file at ${resolve(path)}`);
  } catch (error) {}
};

export default newMapper;
