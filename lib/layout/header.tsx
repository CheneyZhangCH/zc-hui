import React from 'react';

import { createScopedClasses } from "../helper/classes";

const sc = createScopedClasses('layout');

interface IHeaderProps extends React.HTMLAttributes<HTMLElement> {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div className={sc('header', className)} {...rest}>
      Header
    </div>
  );
};

export default Header;