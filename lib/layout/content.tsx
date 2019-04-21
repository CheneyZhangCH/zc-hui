import React from 'react';
import { createScopedClasses } from "../helper/classes";

const sc = createScopedClasses('layout');

interface IContentProps extends React.HTMLAttributes<HTMLElement> {
}

const Content: React.FunctionComponent<IContentProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div className={sc('content', className)} {...rest}>
      {props.children}
    </div>
  );
};

export default Content;
