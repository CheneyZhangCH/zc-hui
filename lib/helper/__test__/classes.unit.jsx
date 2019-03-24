import classes from './../classes';

describe('classes', () => {
  it('接受 aaa， 输出 aaa', () => {
    const result = classes('aaa')
    expect(result).toEqual('aaa');
  });
  it('接受 undefined， 输出 空字符串', () => {
    const result = classes(undefined)
    expect(result).toEqual('');
  });
  it('接受 false， 输出 空字符串', () => {
    const result = classes(false)
    expect(result).toEqual('');
  });
});