import React, { Fragment, useState } from 'react';
import { Button } from '../index';
import Dialog, { alert, confirm, modal } from './dialog';

const DialogExample: React.FunctionComponent = () => {
  const [x, setX] = useState(false);

  const openModal = () => {
    const close = modal(
      <Fragment>
        <div>this is a div</div>
        <Button type="primary" onClick={() => close()}>close</Button>
      </Fragment>
    );
  };


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
      <Button style={{ marginRight: 10 }} onClick={() => alert('alert')}>alert</Button>
      <Button style={{ marginRight: 10 }} onClick={() =>
        confirm('confirm', () => {
          console.log('你点击了yes');
        }, () => {
          console.log('你点击了no');
        })}>confirm</Button>
      <Button style={{ marginRight: 10 }} onClick={openModal}>modal</Button>
    </div>
  );
};

export default DialogExample;