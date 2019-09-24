import React, { Fragment, ReactElement, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createScopedClasses } from '../helper/classes';
import { Button, Icon } from '../index';
import './dialog.scss';

const sc = createScopedClasses('dialog');

// import classes from '../helper/classes';

interface IDialogProps {
  visible: boolean,
  // 展示的header title
  title?: string | ReactNode,
  buttons?: Array<ReactElement>;
  onClose: React.MouseEventHandler;
  // 点击遮罩层是否关闭
  noCloseOnClickMask?: boolean;
  // 是否展示右上角X按钮
  showClose?: boolean;
  // 是否展示取消按钮
  showCancel?: boolean;
  // 取消按钮展示文案，默认为'取消'
  cancelText?: string;
  // 确认按钮展示文案，默认为'确认'
  okText?: string;
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
    document.removeEventListener('mousemove', dialogMove)
  };

  useEffect(() => {
    if (props.visible) {
      position = { startX: 0, startY: 0, dx: dialogRef ? -dialogRef.clientWidth / 2 : 0, dy: 0, tx: 0, ty: 0 }
      if (headerRef) headerRef.addEventListener('mousedown', moveStart)
      document.addEventListener('mouseup', moveEnd)

      return () => {
        if (headerRef)
          headerRef.removeEventListener('mousedown', moveStart)
        document.removeEventListener('mouseup', moveEnd)
        document.removeEventListener('mousemove', dialogMove)
      }
    }
  }, [props.visible])

  const result = props.visible ?
    <Fragment>
      <div className={sc('mask')} onClick={handleClickMask}/>
      <div className={sc('')} ref={ref => dialogRef = ref} >
        <Icon name="close" className={sc('close')} onClick={handleClose}/>
        <header className={sc('header')} ref={ref => headerRef = ref}>
          {props.title || '提示'}
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

interface IModalProps {
  title?: string | ReactNode,
  content: ReactNode,
  buttons?: Array<ReactElement>,
  onCancel?: () => void,
}

const modal = (props: IModalProps) => {
  const { title, content, buttons, onCancel, ...rest } = props;
  const onClose = () => {
    // console.log('onClose');
    ReactDOM.render(React.cloneElement(component, { visible: false }), divWrap);
    ReactDOM.unmountComponentAtNode(divWrap);
    divWrap.remove();
  };

  const component = (
    <Dialog visible={true}
            title={title}
            onClose={() => {
              onCancel && onCancel();
              onClose();
            }}
            {...rest}
            buttons={buttons}
    >
      {content}
    </Dialog>
  );
  const divWrap = document.createElement('div');
  document.body.appendChild(divWrap);
  ReactDOM.render(component, divWrap);
  return onClose;
};

interface IWarningProps {
  title?: string | ReactNode,
  content?: string | ReactNode,
  okText?: string,
}

const warning = (props: IWarningProps) => {
  const { title='警告', content, okText } = props;
  const buttons = [<Button type="primary" onClick={() => close()}>{okText ? okText : '确定'}</Button>];
  const close = modal({ title, content, buttons });
};

interface IConfirmProps {
  title?: string | ReactNode,
  content?: string | ReactNode,
  onConfirm?: () => void,
  onCancel?: () => void,
  cancelText?: string,
  okText?: string
}

const confirm = (props: IConfirmProps) => {
  const { title, content, onConfirm, onCancel, cancelText, okText } = props;
  const handleConfirm = () => {
    // console.log('handleConfirm');
    handleClose();
    onConfirm && onConfirm();
  };

  const handleCancel = () => {
    // console.log('handleCancel');
    handleClose();
    onCancel && onCancel();
  };

  const buttons = [
    <Button onClick={handleCancel}>{cancelText ? cancelText : '取消'}</Button>,
    <Button onClick={handleConfirm} type="primary">{okText ? okText : '确定'}</Button>
  ];

  const handleClose = modal({ title, content, buttons });
};

export { warning, confirm, modal };

export default Dialog;
