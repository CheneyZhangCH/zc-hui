import React, { Fragment, ReactElement } from 'react';
import ReactDOM from 'react-dom';

import { createScopedClasses } from '../helper/classes';

import './dialog.scss';

import { Icon } from '../index';

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
        <footer className={sc('footer')}>
          {props.buttons && props.buttons.length > 0 && props.buttons.map((button, index) => {
            return React.cloneElement(button, { key: index });
          })}
        </footer>
      </div>
    </Fragment> :
    null;

  return (
    ReactDOM.createPortal(result, document.body)
  );
};

const alert = (content: string) => {
  const divWrap = document.createElement('div');

  const component = <Dialog visible={true} onClose={() => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), divWrap);
    ReactDOM.unmountComponentAtNode(divWrap);
    divWrap.remove();
  }}>
    {content}
  </Dialog>;

  document.body.append(divWrap);
  ReactDOM.render(component, divWrap);

};

export { alert };

export default Dialog;