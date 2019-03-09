import renderer from 'react-test-renderer';
import React from 'react';
import Button from '../button';


describe('Button', () => {
  it('should be div ', () => {
    // const tree = renderer
    //   .create(<Button icon="alipay"><span>Click Me</span></Button>)
    //   .toJSON()
    // expect(tree).toMatchSnapshot()
    const json = renderer.create(<Button/>).toJSON();
    expect(json).toMatchSnapshot();
  });
});