import React, { useState } from 'react';
import { Button } from '../index';
import Dialog from './dialog';

const DialogExample: React.FunctionComponent = () => {
  const [x, setX] = useState(false);

  return (
    <div>
      <Button onClick={() => setX(!x)}>Button</Button>
      <Dialog visible={x}>
        <div>dialog</div>
      </Dialog>
    </div>
  );
};

export default DialogExample;