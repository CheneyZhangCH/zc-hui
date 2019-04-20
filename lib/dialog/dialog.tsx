import React, { Fragment, ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { createScopedClasses } from '../helper/classes';

import './dialog.scss';

import { Button, Icon } from '../index';

const sc = createScopedClasses('dialog');

// import classes from '../helper/classes';

interface IDialogProps {
  visible: boolean;
  buttons?: Array<ReactElement>;
  onClose: React.MouseEventHandler;
  noCloseOnClickMask?: boolean;
}

const Dialog: React.FunctionComponent<IDialogProps> = (props) => {
  const handleClose: React.MouseEventHandler = (e) => {
    props.onClose(e);
  };

  const handleClickMask: React.MouseEventHandler = (e) => {
    if (props.noCloseOnClickMask === true) e.preventDefault();
    else props.onClose(e);
  };

  const result = props.visible ?
    <Fragment>
      <div className={sc('mask')} onClick={handleClickMask}/>
      <div className={sc('')}>
        <Icon name="close" className={sc('close')} onClick={handleClose}/>
        <header className={sc('header')}>
          提示
        </header>
        <main className={sc('main')}>
          {props.children}
        </main>
        {
          props.buttons && props.buttons.length > 0 &&
          <footer className={sc('footer')}>
            {props.buttons && props.buttons.length > 0 && props.buttons.map((button, index) => {
              return React.cloneElement(button, { key: index });
            })}
          </footer>
        }
      </div>
    </Fragment> :
    null;

  return (
    ReactDOM.createPortal(result, document.body)
  );
};

const modal = (content: ReactNode, buttons?: Array<ReactElement>, onCancel?: () => void) => {
  const onClose = () => {
    console.log('onClose');
    ReactDOM.render(React.cloneElement(component, { visible: false }), divWrap);
    ReactDOM.unmountComponentAtNode(divWrap);
    divWrap.remove();
  };

  const component = (
    <Dialog visible={true}
            onClose={() => {
              onCancel && onCancel();
              onClose();
            }}
            buttons={buttons}
    >
      {content}
    </Dialog>
  );
  const divWrap = document.createElement('div');
  document.body.append(divWrap);
  ReactDOM.render(component, divWrap);
  return onClose;
};

const alert = (content: string) => {
  const buttons = [<Button type="primary" onClick={() => close()}>确认</Button>];
  const close = modal(content, buttons);
};

const confirm = (content: string, onConfirm?: () => void, onCancel?: () => void) => {
  const handleConfirm = () => {
    console.log('handleConfirm');
    handleClose();
    onConfirm && onConfirm();
  };

  const handleCancel = () => {
    console.log('handleCancel');
    handleClose();
    onCancel && onCancel();
  };

  const buttons = [
    <Button onClick={handleCancel}>取消</Button>,
    <Button onClick={handleConfirm} type="primary">确认</Button>
  ];

  const handleClose = modal(content, buttons, onCancel);
};

export { alert, confirm, modal };

export default Dialog;