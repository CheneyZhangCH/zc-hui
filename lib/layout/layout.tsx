import React, { ReactElement } from 'react';
import { createScopedClasses } from "../helper/classes";

import './layout.scss';
import Aside from "./aside";

const sc = createScopedClasses('layout');

interface ILayoutProps extends React.HTMLAttributes<HTMLElement> {
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  const { className, ...rest } = props;
  const childrenArray = props.children as Array<ReactElement>;
  const hasAside = childrenArray &&
    childrenArray.reduce((result, node) => result || node.type === Aside, false);

  return (
    <div className={sc(hasAside ? ['', 'has-aside'] : '', className)} {...rest}>
      {props.children}
    </div>
  );
};

export default Layout;