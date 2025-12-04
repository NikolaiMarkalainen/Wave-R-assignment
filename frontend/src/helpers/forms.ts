import type { FormItemRule } from 'naive-ui';
import type { FormRules } from 'naive-ui';
export const employeeFormRules: FormRules = {
  firstname: {
    required: true,
    message: 'Please enter employee Firstname',
    trigger: 'blur',
  },
  lastname: {
    required: true,
    message: 'Please enter employee Lastname',
    trigger: 'blur',
  },
  occupation: {
    required: true,
    message: 'Please enter employee Role',
    trigger: ['blur', 'change'],
  },
  age: {
    required: true,
    message: 'Please enter employee Age',
    trigger: 'blur',
    validator(rule: FormItemRule, value: number) {
      return value > 0;
    },
  },
  salary: {
    required: true,
    message: 'Please enter employee Salary',
    trigger: 'blur',
    validator(rule: FormItemRule, value: number) {
      return value > 0;
    },
  },
  employed: {
    required: true,
    message: 'Please enter employee Date of employment',
    trigger: 'blur',
    validator(rule: FormItemRule, value: number) {
      return value > 0;
    },
  },
};

export const loginRules: FormRules = {
  username: [{ required: true, message: 'Username is required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
};
