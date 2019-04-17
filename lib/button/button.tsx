import React from 'react';

import classes from '../helper/classes';
import './button.scss';

// step 1
interface ButtonProps {
  type?: string;
  icon?: string;
  shape?: string;
  size?: string;
  loading?: boolean | { delay?: number };
  className?: string;
  ghost?: boolean;
  block?: boolean;
  waveColor?: string;
  children?: React.ReactNode;

  // react中 svg的 鼠标事件的处理函数
  // onClick?: React.MouseEventHandler<SVGElement>;
}

const handleClick = (e: React.MouseEvent) => {
  console.log(e);
  console.log(e.screenX);
  console.log(e.screenY);
  console.log(e.pageX);
  console.log(e.pageY);
  console.log(e.target);
};


// 如何声明一个react函数组件接受一个类型
// 生命Icon为react函数组件，接受参数 类型IconProps
const Button: React.FunctionComponent<ButtonProps> = ({ className, type, ...rest }) => {
  // const {className, name, ...rest} = props;
  // {...props}  大括号是指在react tsx内写js的写法 ...props是指展开
  return (
    // step 2

    <button onClick={(e) => handleClick(e)} className={classes('hui-button', className)} {...rest}>
      <span>button</span>
    </button>
  );
};

export default Button;