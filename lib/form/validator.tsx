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

type OneError = string | Promise<string>;

const Validator = (formValue: IFormValue, rules: FormRules, callback: (errors: any) => void): void => {
  let errors: { [key: string]: OneError[] } = {};
  const addError = (key: string, error: OneError) => {
    if (errors[key] === undefined) errors[key] = [];
    errors[key].push(error);
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

  const hasError = (item: [string, undefined] | [string, string]): item is [string, string] =>  {
    return typeof item[1] === 'string';
  }

  // Object.keys(errors) === ['username', 'password']
  const flattenErrors = flat(Object.keys(errors).map(key =>
    // error[key] === [promise, promise]
    errors[key].map<[string, OneError]>((error: any) => [key, error])
  ));

  const newPromises = flattenErrors.map(([key, promiseOrSting]) => {
    const promise = (promiseOrSting instanceof Promise ? promiseOrSting : Promise.reject(promiseOrSting))

      return promise.then<[string, undefined], [string, string]>(() => [key, undefined], (reason) => [key, reason])
    }

  );

  Promise.all(newPromises).then(result => {
      callback(zip(result.filter<[string, string]>(hasError)));
    }
  );
};

function flat<T>(arr: Array<T | T[]>) {
  const result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      result.push(...arr[i] as T[]);
    } else {
      result.push(arr[i] as T);
    }
  }
  return result;
}

function zip(kvList: Array<[string, string]>) {
  const result: { [key: string]: string[] } = {};
  kvList.map(([key, value]) => {
    result[key] = result[key] || [];
    result[key].push(value);
  });
  return result;
}

export default Validator;
