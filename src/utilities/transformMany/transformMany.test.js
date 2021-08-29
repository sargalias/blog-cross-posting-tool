import transformMany from './transformMany.js';

describe('transformMany', () => {
  test('(content, []) should return the original content', () => {
    const content = 'hello foo';
    const transformMaps = [];

    const result = transformMany(content, transformMaps);

    expect(result).toBe(content);
  });

  test('should transform content when transformMaps has a single map', () => {
    const content = 'hello foo';
    const transformMaps = [{ exactReplace: { foo: 'bar' } }];

    const result = transformMany(content, transformMaps);

    expect(result).toBe('hello bar');
  });

  test('should transform content when transformMaps has two maps', () => {
    const content = 'hello foo aaaa';
    const transformMaps = [
      { exactReplace: { foo: 'bar' } },
      { exactReplace: { aaaa: 'bbbb' } },
    ];

    const result = transformMany(content, transformMaps);

    expect(result).toBe('hello bar bbbb');
  });
});
