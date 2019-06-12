import React, { Fragment, useState } from 'react';
import { Button } from '../index';

import Form, { IFormValue } from './form';
import Validator, {noError} from './validator';

const usernames = ['cheney', 'zch'];
const checkUserName = (username: string, success: () => void, fail: () => void) => {
  setTimeout(() => {
    if (usernames.indexOf(username) >= 0) fail();
    else success();
  }, 2000);
};

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

  const validator = (username: string) => {
    console.log('调用validator');
    return new Promise<string>((resolve, reject) => {
      checkUserName(username, resolve, () => reject('unique'));
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    const rules = [
      { key: 'username', required: true },
      { key: 'username', minLength: 6, maxLength: 16 },
      { key: 'username', validator },
      { key: 'username', validator },
      { key: 'password', required: true },
      { key: 'password', validator },
      { key: 'password', validator },
    ];

    const errors = Validator(formData, rules, (errors) => {
      setErrors(errors);
      if (noError(errors)) {
        // 没错
      }
    );

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
