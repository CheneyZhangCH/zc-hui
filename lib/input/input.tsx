import * as React from 'react';
import { InputHTMLAttributes } from 'react';

import './input.scss'

import { createScopedClasses } from '../helper/classes';

const sc = createScopedClasses('input');

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {

}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <input className={sc('', className)} {...rest}/>
  );
};

export default Input;
