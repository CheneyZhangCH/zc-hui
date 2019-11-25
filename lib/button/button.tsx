import React from 'react';

import classes, { createScopedClasses } from '../helper/classes';
import { Icon } from '../index';

import './button.scss';

const sc = createScopedClasses('btn');

interface IBaseButtonProps {
  type?: 'default' | 'primary' | 'text' | 'submit';
  shape?: 'square' | 'circle';
  size?: 'normal' | 'small' | 'large';
  className?: string;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  iconFill?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type AnchorButtonProps = {
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<any>;
} & IBaseButtonProps & Omit<React.AnchorHTMLAttributes<any>, 'type'>;

type NativeButtonProps = {
  onClick?: React.MouseEventHandler<any>;
} & IBaseButtonProps & Omit<React.ButtonHTMLAttributes<any>, 'type'>;

type IButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button: React.FunctionComponent<IButtonProps> = ({ type, shape, size, className, icon, iconPosition, iconFill, onClick, children, ...rest }) => {
  const classNames: (string | undefined)[] = [];
  const classParams = {
    [`${type}`]: type,
    [`${shape}`]: shape,
    [`${size}`]: size,
  };

  Object.keys(classParams).map((item) => {
      if (item !== undefined) classNames.push(sc(item));
    }
  );

  const handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (e) => {
    if (rest.disabled) {
      return e.preventDefault();
    }

    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  if (rest.href !== undefined) {
    return (
      <a className={classes('hui-btn', className, ...classNames)} href={rest.href} target={rest.target} {...rest}>
        {icon && iconPosition !== 'right' && <Icon fill={iconFill} className='hui-btn-icon' name={icon}/>}
        {children}
        {icon && iconPosition === 'right' && <Icon fill={iconFill} className='hui-btn-icon' name={icon}/>}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={classes('hui-btn', className, ...classNames)} {...rest}>
      {icon && iconPosition !== 'right' && <Icon fill={iconFill} className='hui-btn-icon' name={icon}/>}
      {children}
      {icon && iconPosition === 'right' && <Icon fill={iconFill} className='hui-btn-icon' name={icon}/>}
    </button>
  );
};

Button.defaultProps = {
  type: 'default',
  shape: 'square',
  size: 'normal',
};

export default Button;
