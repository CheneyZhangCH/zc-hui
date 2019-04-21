import React from 'react';

import { createScopedClasses } from "../helper/classes";

const sc = createScopedClasses('layout');

interface IAsideProps extends React.HTMLAttributes<HTMLElement> {
}

const Aside: React.FunctionComponent<IAsideProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div className={sc('aside', className)} {...rest}>
      {props.children}
    </div>
  );
};

export default Aside;
