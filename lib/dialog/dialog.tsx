import React, { ReactNode } from 'react';
// import classes from '../helper/classes';

// step 1
interface DialogProps {
  visible: boolean;
  children: ReactNode;
}

const Dialog: React.FunctionComponent<DialogProps> = (props) => {
  return (
    props.visible ?
      <div> {props.children}</div> :
      null
  );
};

export default Dialog;