import replaceRootRelativeLinks from './replaceRootRelativeLinks.js';

describe('replaceRootRelativeLinks', () => {
  test(`should return original content when content doesn't have root relative links`, () => {
    const content = 'Test content';
    const result = replaceRootRelativeLinks(content, 'https://example.com');
    expect(result).toBe(content);
  });

  test(`should replace root relative URL with no path`, () => {
    const content = `Test content [](/)`;
    const result = replaceRootRelativeLinks(content, 'https://example.com');
    expect(result).toBe(`Test content [](https://example.com/)`);
  });

  test(`should replace root relative URL with path`, () => {
    const content = `Test content [](/foo)`;
    const result = replaceRootRelativeLinks(content, 'https://example.com');
    expect(result).toBe(`Test content [](https://example.com/foo)`);
  });

  test(`should replace root relative URL with multi-segmented path`, () => {
    const content = `Test content [](/foo/bar/)`;
    const result = replaceRootRelativeLinks(content, 'https://example.com');
    expect(result).toBe(`Test content [](https://example.com/foo/bar/)`);
  });

  test(`should replace multiple instances of root relative URLs`, () => {
    const content = `
Test [](/foo/bar/), test 2 [](/baz).
Test 3 [](/hello/goodbye).
`;
    const expected = `
Test [](https://example.com/foo/bar/), test 2 [](https://example.com/baz).
Test 3 [](https://example.com/hello/goodbye).
`;
    const result = replaceRootRelativeLinks(content, 'https://example.com');
    expect(result).toBe(expected);
  });
});
