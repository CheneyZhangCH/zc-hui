import React from 'react';
import { createScopedClasses } from "../helper/classes";

const sc = createScopedClasses('layout');

interface IFooterProps extends React.HTMLAttributes<HTMLElement> {
}
const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const { className, ...rest } = props;


  return (
    <div className={sc('footer', className)} {...rest}>
      Footer
    </div>
  );
};

export default Footer;


