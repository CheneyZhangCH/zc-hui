import React, { ReactFragment } from 'react';

import { Input } from '../index';

import './form.scss';

import { createScopedClasses } from '../helper/classes';

const sc = createScopedClasses('form');

export interface IFormValue {
  [Key: string]: string
}

interface IFormProps {
  value: IFormValue;
  fields: Array<{ name: string, label: string, input: { type: string } }>;
  buttons: ReactFragment;
  onChange: (value: IFormValue) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  errors: { [key: string]: string[] }
}

const Form: React.FunctionComponent<IFormProps> = (props) => {
  const formData = props.value;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  };

  const onInputChange = (name: string, value: string) => {
    console.log(name);
    console.log(value);
    const newFormDataValue = { ...formData, [name]: value };
    props.onChange(newFormDataValue);
  };

  return (
    <form onSubmit={onSubmit}>
      <table className={sc('table')}>
        <tbody>
        {
          props.fields.map((f) =>
            <tr key={f.name} className={sc('tr')}>
              <td className={sc('td')}>
                <span>{f.label}</span>
              </td>
              <td className={sc('td')}>
                <Input className={sc('input')}
                       type={f.input.type}
                       value={formData[f.name]}
                       onChange={(e) => onInputChange(f.name, e.target.value)}/>
              </td>
              <td className={sc('td')}>
                <div>{props.errors[f.name] && props.errors[f.name].join('， ')}</div>
              </td>
            </tr>
          )
        }
        <tr>
          <td className={sc('td')}/>
          <td className={sc('td')}>
            {props.buttons}
          </td>
        </tr>
        </tbody>
      </table>

    </form>
  );
};

export default Form;
