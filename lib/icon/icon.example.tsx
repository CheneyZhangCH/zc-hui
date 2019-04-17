import React from 'react';
import Icon from "./icon";

const IconExample: React.FunctionComponent = () => {
  return (
    <div>
      <Icon name="wechat" fill={'#555'} style={{marginRight: 5}} />
      <Icon name="alipay" fill={'blue'} style={{marginRight: 5}} />
      <Icon name="dingtalk" fill={'grey'} style={{marginRight: 5}} />
      <Icon name="qq" fill={'green'} style={{marginRight: 5}}  />
    </div>
  );
};

export default IconExample;