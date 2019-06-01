import React, { Fragment, useState } from 'react';
import { Button } from '../index';

import Form, { IFormValue } from './form';
import Validator from './validator';

const FormExample: React.FunctionComponent = () => {

  const [formData, setFormData] = useState<IFormValue>({
    username: '',
    password: '',
  });

  const [fields] = useState([
    { name: 'username', label: '用户名', input: { type: 'text' } },
    { name: 'password', label: '密码', input: { type: 'password' } }
  ]);

  const [errors, setErrors] = useState({});

  const onSubmit = (e: React.FormEvent) => {
    const rules = [
      { key: 'username', required: true },
      { key: 'username', minLength: 6, maxLength: 16 },
      { key: 'username', pattern: /^[A-Za-z0-9]+$/ },
      { key: 'password', required: true },
    ];

    const errors = Validator(formData, rules);
    setErrors(errors);

    console.log(formData);
    console.log(errors);
  };

  return (
    <Form value={formData}
          fields={fields}
          onSubmit={onSubmit}
          errors={errors}
          onChange={(newValue) => setFormData(newValue)}
          buttons={
            <Fragment>
              <Button type="primary">提交</Button>
              <Button>返回</Button>
            </Fragment>
          }
    />
  );
};

export default FormExample;
