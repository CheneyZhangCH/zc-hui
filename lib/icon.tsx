import React from 'react';

interface IconProps {
  name: string;
}

// 如何生命一个react函数组件接受一个类型
// 生命Icon为react函数组件，接受参数 类型IconProps
const Icon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <span>{props.name}</span>
  )
}

export default Icon;