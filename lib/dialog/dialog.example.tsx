import React, { useState } from 'react';
import { Button } from '../index';
import Dialog, { warning, confirm, modal } from './dialog';

const DialogExample: React.FunctionComponent = () => {
  const [x, setX] = useState(false);

  const openModal = () => {
    const close = modal({
      title: '提示',
      content: (<div>this is a div</div>),
      buttons: [
        <Button type="primary" onClick={() => close()}>close</Button>
      ],
    });
  };

  return (
    <div>
      <Button onClick={() => setX(!x)} style={{ marginRight: 10 }}>Dialog</Button>
      <Dialog visible={x} title='提示' buttons={[
        <Button onClick={() => setX(false)}>cancel</Button>,
        <Button onClick={() => setX(false)} type='primary'>ok</Button>]}
              onClose={() => setX(false)}
      >
        <div>dialog</div>
      </Dialog>
      <Button style={{ marginRight: 10 }} onClick={() => warning({content: 'warning'})}>warning</Button>
      <Button style={{ marginRight: 10 }} type='primary' onClick={() =>
        confirm({
          title: '提示',
          okText: 'confirm',
          onCancel: () => { console.log('你点击了no'); },
          onConfirm: () => { console.log('你点击了no'); },
        })}>confirm</Button>
      <Button style={{ marginRight: 10 }} onClick={openModal}>modal</Button>
    </div>
  );
};

export default DialogExample;
