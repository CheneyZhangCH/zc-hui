import classnames from './classnames';

describe('classnames', () => {
  it('接受 aaa， 输出 aaa', () => {
    const result = classnames('aaa')
    expect(result).toEqual('aaa');
  });
  it('接受 undefined， 输出 空字符串', () => {
    const result = classnames(undefined)
    expect(result).toEqual('');
  });
  it('接受 false， 输出 空字符串', () => {
    const result = classnames(false)
    expect(result).toEqual('');
  });
});