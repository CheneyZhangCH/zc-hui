import React, { ReactFragment } from 'react';

import { Input } from '../index';

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
      <table>
      {
        props.fields.map((f) =>
          <tr key={f.name}>
            <td>
              {f.label}
            </td>
            <td>
              <Input
                type={f.input.type}
                value={formData[f.name]}
                onChange={(e) => onInputChange(f.name, e.target.value)}/>
            </td>
            <td>
              <span>{props.errors[f.name]}</span>
            </td>
          </tr>
        )
      }
      </table>
      <div>
        {props.buttons}
      </div>
    </form>
  );
};

export default Form;
