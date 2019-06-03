import React, { Fragment, ReactElement, ReactNode, useEffect } from 'react';
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
  // 点击遮罩层是否关闭
  noCloseOnClickMask?: boolean;
  // 展示的header title
  title?: string;
  // 是否展示右上角X按钮
  showClose?: boolean;
  // 是否展示取消按钮
  showCancel?: boolean;
  // 取消按钮展示文案，默认为'取消'
  cancelBtn?: string;
  // 确认按钮展示文案，默认为'确认'
  confirmBtn?: string;

}

const Dialog: React.FunctionComponent<IDialogProps> = (props) => {
  const handleClose: React.MouseEventHandler = (e) => {
    props.onClose(e);
  };

  const handleClickMask: React.MouseEventHandler = (e) => {
    if (props.noCloseOnClickMask === true) e.preventDefault();
    else props.onClose(e);
  };

  let dialogRef: HTMLElement | null;
  let headerRef: HTMLElement | null;
  let position = { startX: 0, startY: 0, dx: 0, dy: 0, tx: 0, ty: 0 };

  const dialogMove: { (event: MouseEvent): void } = (e: MouseEvent) => {
    const tx = e.pageX - position.startX;
    const ty = e.pageY - position.startY;
    if (dialogRef)
      dialogRef.style.transform = `translate(${tx}px,${ty}px)`;
    position.dx = tx;
    position.dy = ty;
  };

  const moveStart: { (event: MouseEvent): void } = (e: MouseEvent) => {
    console.log('e', e);
    if (e.button !== 0) return;
    document.addEventListener('mousemove', dialogMove);
    position.startX = e.pageX - position.dx;
    position.startY = e.pageY - position.dy;
  };

  const moveEnd: { (event: MouseEvent): void } = (e: MouseEvent) => {
    document.removeEventListener('mousemove', dialogMove);
  };

  useEffect(() => {
    position = { startX: 0, startY: 0, dx: dialogRef ? -dialogRef.clientWidth / 2 : 0, dy: 0, tx: 0, ty: 0 };
    if (headerRef) headerRef.addEventListener('mousedown', moveStart);
    document.addEventListener('mouseup', moveEnd);

    return () => {
      if (headerRef)
        headerRef.removeEventListener('mousedown', moveStart);
      document.removeEventListener('mouseup', moveEnd);
      document.removeEventListener('mousemove', dialogMove);
    };
  }, []);

  const result = props.visible ?
    <Fragment>
      <div className={sc('mask')} onClick={handleClickMask}/>
      <div className={sc('')} ref={ref => dialogRef = ref}>
        <Icon name="close" className={sc('close')} onClick={handleClose}/>
        <header className={sc('header')} ref={ref => headerRef = ref}>
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
