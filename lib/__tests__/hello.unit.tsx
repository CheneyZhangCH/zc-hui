function add(a: number, b: number): number {
  return a + b;
}

test('1 + 1 = 2', () => {
  expect(add(1, 1)).toEqual(2)
})

describe('hello2', () => {
  it('should 1 = 1', function () {
    expect(1).toEqual(1)
  });
})