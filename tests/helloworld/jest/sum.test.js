const sum = require('./sum');

test('jest helloworld', () => {
  expect(sum(1, 2)).toBe(3);
});
