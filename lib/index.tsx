import React from 'react';
import ReactDom from 'react-dom';

// import Button from './button';

import Icon from './icon';

const fn: React.MouseEventHandler = (e) => {
  console.log(e.target);
  console.log(e.target as HTMLDivElement); // 断言
};

ReactDom.render(
  <div>
    <Icon name='qq' onClick={fn} className={'hahaha'}
          onMouseEnter={() => {console.log('enter')}}
          onMouseLeave={() => {console.log('leave')}}/>
  </div>,
  document.querySelector('#root')
);
