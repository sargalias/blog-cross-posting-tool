import transform from './transform';

describe('transform', () => {
  test('should replace content as directed by exactReplace', () => {
    const content = 'Test content';
    const transformMap = {
      exactReplace: {
        content: 'foo',
      },
    };
    const expected = 'Test foo';

    const result = transform(content, transformMap);

    expect(result).toBe(expected);
  });

  test('should replace root relative URLs as directed by replaceRootRelativeUrls', () => {
    const content = 'Test [](/foo)';
    const transformMap = {
      rootRelativeUrlsPrefix: 'https://example.com',
    };
    const expected = 'Test [](https://example.com/foo)';

    const result = transform(content, transformMap);

    expect(result).toBe(expected);
  });

  test('should replace exact content and root relative URLs when those options exist in the transformMap and relevant content exists', () => {
    const content = 'Test foo [](/foo)';
    const transformMap = {
      exactReplace: {
        foo: 'bar',
      },
      rootRelativeUrlsPrefix: 'https://example.com',
    };
    const expected = 'Test bar [](https://example.com/bar)';

    const result = transform(content, transformMap);

    expect(result).toBe(expected);
  });
});
