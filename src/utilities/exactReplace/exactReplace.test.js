import exactReplace from './exactReplace.js';

describe('exactReplace', () => {
  test('should return original content when replaceMap is empty', () => {
    const replaceMap = {};
    const content = `Test content`;

    const result = exactReplace(content, replaceMap);

    expect(result).toBe(content);
  });

  test('should return original content when content described in replaceMap does not exist', () => {
    const replaceMap = {
      Hello: 'Goodbye',
      './foo.png': 'https://example.com/foo.png',
    };
    const content = `Test content`;

    const result = exactReplace(content, replaceMap);

    expect(result).toBe(content);
  });

  test('should replace a single instance of content described by replaceMap if relevant content only exists once', () => {
    const replaceMap = {
      Hello: 'Goodbye',
      './foo.png': 'https://example.com/foo.png',
    };
    const content = `
Hello everyone!
![alt text](./foo.png)
`;
    const expected = `
Goodbye everyone!
![alt text](https://example.com/foo.png)
`;

    const result = exactReplace(content, replaceMap);

    expect(result).toBe(expected);
  });

  test('should replace multiple instances of content described by replaceMap if relevant content exists multiple times', () => {
    const replaceMap = {
      Hello: 'Goodbye',
      './foo.png': 'https://example.com/foo.png',
    };
    const content = `
Hello everyone!
Hello everyone!
![alt text](./foo.png)
`;
    const expected = `
Goodbye everyone!
Goodbye everyone!
![alt text](https://example.com/foo.png)
`;

    const result = exactReplace(content, replaceMap);

    expect(result).toBe(expected);
  });
});
