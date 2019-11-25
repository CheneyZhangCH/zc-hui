import React from 'react';
import Button from "./button";

const IconExample: React.FunctionComponent = () => {
  return (
    <div>
      <Button style={{ marginRight: 10 }} type="primary" icon='search'>
        Primary
      </Button>
      <Button style={{ marginRight: 10 }} type="text">
        Text
      </Button>
      <Button style={{ marginRight: 10 }} type="default">
        default
      </Button>
      <Button style={{ marginRight: 10 }} type="primary" size="large">
        large
      </Button>
      <Button style={{ marginRight: 10 }} type="text" size="normal">
        Text
      </Button>
      <Button style={{ marginRight: 10 }} type="default" size="small">
        small
      </Button>
      <Button style={{ marginRight: 10 }} shape="circle">
        circle
      </Button>

    </div>
  );
};

export default IconExample;
