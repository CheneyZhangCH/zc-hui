import * as React from 'react';
import { HTMLAttributes } from 'react';
import { createScopedClasses } from '../helper/classes';

import './scroll.scss';

const sc = createScopedClasses('scroll');

interface IScroll extends HTMLAttributes<HTMLDivElement> {

}

const Scroll: React.FunctionComponent = (props: IScroll) => {
  const { children, ...rest } = props;
  return (
    <div className={sc('')} {...rest}>
      <div className={sc('inner')}>
        {children}
      </div>
    </div>
  );
};

export default Scroll;
