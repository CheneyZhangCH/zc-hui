import React, { useState } from 'react';
import { Button } from '../index';
import Dialog from './dialog';

const DialogExample: React.FunctionComponent = () => {
  const [x, setX] = useState(false);

  return (
    <div>
      <Button onClick={() => setX(!x)}>Dialog</Button>
      <Dialog visible={x} buttons={[
        <Button onClick={() => setX(false)}>cancel</Button>,
        <Button onClick={() => setX(false)}>ok</Button>]}
              onClose={() => setX(false)}
      >
        <div>dialog</div>
      </Dialog>
    </div>
  );
};

export default DialogExample;