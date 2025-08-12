const sanitize = require('../sanitize');

describe('sanitize', () => {
  const cases = [
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['&', '&amp;'],
    ['"', '&quot;'],
    ["'", '&#39;'],
    ['/', '&#x2F;'],
    ['`', '&#x60;'],
    ['=', '&#x3D;']
  ];

  test.each(cases)('escapes %s', (char, expected) => {
    expect(sanitize(char)).toBe(expected);
  });

  test('leaves other characters unchanged', () => {
    expect(sanitize('abc')).toBe('abc');
  });
});
