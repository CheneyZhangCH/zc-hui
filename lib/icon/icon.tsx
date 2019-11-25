import React from 'react';

// import './icons/wechat.svg';
// import './icons/alipay.svg';
// import './icons/dingtalk.svg';
// import './icons/qq.svg';
// 静态引入，有利于tree-shaking，去除不需要打包的模块，例如 import _filter from 'lodash/filter'
// vs
// 非静态引入，书写方便
// import './importAllIcons'

import './importAllIcons';
import './icon.scss';
import classes from '../helper/classes';

// step 1
interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
  // react中 svg的 鼠标事件的处理函数
  // onClick?: React.MouseEventHandler<SVGElement>;
}

// 如何声明一个react函数组件接受一个类型
// 生命Icon为react函数组件，接受参数 类型IconProps
const Icon: React.FunctionComponent<IconProps> = ({className, name, ...rest}) => {
  // const {className, name, ...rest} = props;
  // {...props}  大括号是指在react tsx内写js的写法 ...props是指展开
  return (
   // step 2
    <svg className={classes('hui-icon', className)} {...rest}>
      <use xlinkHref={`#${name}`}/>
    </svg>
  );
};

export default Icon;
