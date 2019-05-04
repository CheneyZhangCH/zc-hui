import { IFormValue } from './form';

interface IFormRules {
  key: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
}

type FormRules = Array<IFormRules>

interface IFormError {
  [key: string]: string[];
}

function isEmpty(value: any) {
  return value === undefined || value === null || value === '';
}

const Validator = (formValue: IFormValue, rules: FormRules): IFormError => {
  let errors: any = {};

  const addError = (key: string, message: string) => {
    if (errors[key] === undefined) errors[key] = [];
    errors[key].push(message);
  };

  rules.map(rule => {
    const value = formValue[rule.key];

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

    console.log(rule);
  });

  return errors;
};

export default Validator;