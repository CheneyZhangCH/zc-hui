import React, { useState } from 'react';
import { Button } from '../index';
import Dialog, { alert } from './dialog';

const DialogExample: React.FunctionComponent = () => {
  const [x, setX] = useState(false);

  return (
    <div>
      <Button onClick={() => setX(!x)} style={{ marginRight: 10 }}>Dialog</Button>
      <Dialog visible={x} buttons={[
        <Button onClick={() => setX(false)}>cancel</Button>,
        <Button onClick={() => setX(false)}>ok</Button>]}
              onClose={() => setX(false)}
      >
        <div>dialog</div>
      </Dialog>
      <Button onClick={() => alert('alert')}>alert</Button>
    </div>
  );
};

export default DialogExample;