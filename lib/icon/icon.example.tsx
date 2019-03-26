import React from 'react';
import Icon from "./icon";

const IconExample: React.FunctionComponent = () => {
  return (
    <div>
      <Icon name="wechat" />
      <Icon name="alipay" />
      <Icon name="dingtalk" />
      <Icon name="qq" />
    </div>
  );
};

export default IconExample;