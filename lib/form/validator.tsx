import {IFormValue} from './form';

interface IFormRules {
  key: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  validator?: (value: string) => Promise<string>;
}

type FormRules = Array<IFormRules>

function isEmpty(value: any) {
  return value === undefined || value === null || value === '';
}

export function noError(error: any) {
  return Object.keys(error).length === 0;
}

const Validator = (formValue: IFormValue, rules: FormRules, callback: (errors: any) => void): void => {
  let errors: any = {};

  const addError = (key: string, message: string | Promise<string>) => {
    if (errors[key] === undefined) errors[key] = [];
    errors[key].push(message);
  };

  rules.map(rule => {
    const value = formValue[rule.key];

    if (rule.validator) {
      const promise = rule.validator(value);
      addError(rule.key, promise);
    }

    if (rule.required && isEmpty(value)) {
      addError(rule.key, '必填');
    }

    if (rule.minLength && !isEmpty(value) && value.length < rule.minLength) {
      addError(rule.key, '不能少于6个字符');
    }

    if (rule.maxLength && !isEmpty(value) && value.length > rule.maxLength) {
      addError(rule.key, '不能大于16个字符');
    }

    if (rule.pattern && !(rule.pattern.test(value))) {
      addError(rule.key, '格式错误');
    }
  });

  // Object.keys(errors) === ['username', 'password']
  const flatErrors = flat(Object.keys(errors).map(key =>
    // error[key] === [promise, promise]
    errors[key].map(promise => [key, promise])
  ));

  const newPromises = flatErrors.map(([key, promiseOrSting]) =>
    (promiseOrSting instanceof Promise ? promiseOrSting : Promise.reject(promiseOrSting))
      .then(() => [key, undefined], (reason) => [key, reason])
  );

  Promise.all(newPromises).then(result => {
      callback(zip(result.filter(item => item[1])));
    }
  );
};

function flat(arr: Array<any>) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      result.push(...arr[i]);
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function zip(kvList: Array<[string, string]>) {
  const result = {};
  kvList.map(([key, value]) => {
    result[key] = result[key] || [];
    result[key].push(value);
  });
  return result;
}

export default Validator;
