import classes, { createScopedClasses } from './../classes';

describe('classes', () => {
  it('接受 aaa， 输出 aaa', () => {
    const result = classes('aaa');
    expect(result).toEqual('aaa');
  });
  it('接受 undefined， 输出 空字符串', () => {
    const result = classes(undefined);
    expect(result).toEqual('');
  });
  it('接受 false， 输出 空字符串', () => {
    const result = classes(false);
    expect(result).toEqual('');
  });
});

describe('createScopedClasses', () => {
  it('x', () => {
    const sc = createScopedClasses('layout');
    expect(sc('')).toEqual('hui-layout');
    expect(sc('', 'user-classes')).toEqual('hui-layout user-classes');
    expect(sc('header')).toEqual('hui-layout-header');
    expect(sc('header', 'user-classes')).toEqual('hui-layout-header user-classes');
    expect(sc(['', 'has-aside'])).toEqual('hui-layout hui-layout-has-aside');
    expect(sc(['', 'has-aside'], 'user-classes')).toEqual('hui-layout hui-layout-has-aside user-classes');
  });
});