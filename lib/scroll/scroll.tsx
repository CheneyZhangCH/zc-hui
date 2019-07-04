import * as React from 'react';
import { HTMLAttributes } from 'react';
import { createScopedClasses } from '../helper/classes';

import './scroll.scss';

import scrollBarWidth from './../helper/scrollBarWidth';

const sc = createScopedClasses('scroll');

interface IScroll extends HTMLAttributes<HTMLDivElement> {

}

console.log('scrollBarWidth()', scrollBarWidth());

const Scroll: React.FunctionComponent = (props: IScroll) => {
  const { children, ...rest } = props;
  return (
    <div className={sc('')} {...rest}>
      <div className={sc('inner')} style={{ right: -scrollBarWidth() }}>
        {children}
      </div>
    </div>
  );
};

export default Scroll;
