import * as renderer from 'react-test-renderer';
import React from 'react';
import { mount } from 'enzyme';
// renderer 测内容  mount 测事件
import Icon from '../icon';

describe('Icon', () => {
  it('should be svg ', () => {
    // const tree = renderer
    //   .create(<Button icon="alipay"><span>Click Me</span></Button>)
    //   .toJSON()
    // expect(tree).toMatchSnapshot()
    const json = renderer.create(<Icon/>).toJSON();
    expect(json).toMatchSnapshot();
  });
  it('fn 被调用了', () => {
    const fn = jest.fn();
    const c = mount(<Icon name='wechat' onClick={fn}/>);
    expect(c.find('use').simulate('click'));
    expect(fn).toBeCalled();
  });
});