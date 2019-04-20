import React, { Fragment } from 'react';
import { createScopedClasses } from '../helper/classes';

import './dialog.scss';

import { Icon, Button } from '../index';

const sc = createScopedClasses('dialog');

// import classes from '../helper/classes';

interface IDialogProps {
  visible: boolean;
}

const Dialog: React.FunctionComponent<IDialogProps> = (props) => {
  return (
    props.visible ?
      <Fragment>
        <div className={sc('mask')}></div>
        <div className={sc('')}>
          <Icon name="close" className={sc('close')}/>
          <header className={sc('header')}>
            提示
          </header>
          <main className={sc('main')}>
            {props.children}
          </main>
          <footer className={sc('footer')}>
            <Button>cancel</Button>
            <Button>ok</Button>
          </footer>
        </div>
      </Fragment> :
      null
  );
};

export default Dialog;