import React from 'react';
import ReactDom from 'react-dom';
import Icon from './icon/icon';

// import Button from './button';


const fn: React.MouseEventHandler = (e) => {
  console.log(e.target);
  // console.log(e.target as HTMLDivElement); // 断言
};

ReactDom.render(
  <div>
    <Icon
      name='wechat'
      onClick={fn}
      className={'hahaha'}
      onMouseEnter={() => {console.log('enter')}}
      onMouseLeave={() => {console.log('leave')}}/>
  </div>,
  document.querySelector('#root')
);
