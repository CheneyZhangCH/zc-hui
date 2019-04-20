import React, { Fragment, ReactElement, ReactFragment, ReactNode } from 'react';
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

const alert = (content: string) => {
  const handleCancel = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), divWrap);
    ReactDOM.unmountComponentAtNode(divWrap);
    divWrap.remove();
  };

  const divWrap = document.createElement('div');
  const component = (
    <Dialog visible={true} onClose={handleCancel}
            buttons={[<Button onClick={handleCancel} type="primary">确认</Button>
            ]}
    >
      {content}
    </Dialog>
  );

  document.body.append(divWrap);
  ReactDOM.render(component, divWrap);
};

const confirm = (content: string, onConfirm?: () => void, onCancel?: () => void) => {
  const handleConfirm = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), divWrap);
    ReactDOM.unmountComponentAtNode(divWrap);
    divWrap.remove();
    onConfirm && onConfirm();
  };

  const handleCancel = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), divWrap);
    ReactDOM.unmountComponentAtNode(divWrap);
    divWrap.remove();
    onCancel && onCancel();
  };

  const divWrap = document.createElement('div');
  const component = (
    <Dialog visible={true}
            onClose={handleCancel}
            buttons={[
              <Button onClick={handleCancel}>取消</Button>,
              <Button onClick={handleConfirm} type="primary">确认</Button>
            ]}
    >
      {content}
    </Dialog>);

  document.body.append(divWrap);
  ReactDOM.render(component, divWrap);

};

const modal = (content: ReactNode | ReactFragment) => {
  // const handleConfirm = () => {
  //   ReactDOM.render(React.cloneElement(component, { visible: false }), divWrap);
  //   ReactDOM.unmountComponentAtNode(divWrap);
  //   divWrap.remove();
  //   onConfirm && onConfirm();
  // };

  const handleCancel = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), divWrap);
    ReactDOM.unmountComponentAtNode(divWrap);
    divWrap.remove();
    // onCancel && onCancel();
  };

  const divWrap = document.createElement('div');
  const component = (
    <Dialog visible={true}
            onClose={handleCancel}
      // buttons={[
      //   <Button onClick={handleCancel}>取消</Button>,
      //   <Button onClick={handleConfirm} type="primary">确认</Button>
      // ]}
    >
      {content}
    </Dialog>);

  document.body.append(divWrap);
  ReactDOM.render(component, divWrap);
  // 函数返回操作内部变量的api，以便外部进行操作
  return handleCancel;
};


export { alert, confirm, modal };

export default Dialog;