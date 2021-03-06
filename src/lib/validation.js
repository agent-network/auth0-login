import { extend } from 'vee-validate';
import { required, min, confirmed, email } from 'vee-validate/dist/rules';

// https://vee-validate.logaretm.com/v3/guide/rules.html

extend('required', {
  ...required,
  message: '必須項目です',
});

extend('confirmed', {
  ...confirmed,
  message: '入力内容が一致しません',
});

extend('min', {
  ...min,
  params: ['length'],
  message: '{length}文字以上で入力してください',
});

extend('email', {
  ...email,
  message: 'メールアドレスが有効ではありません',
});

extend('password-number', {
  message: '数字を含めてください',
  validate: (value) => /[0-9]/.test(value),
});

extend('password-alpha', {
  message: 'アルファベットを含めてください',
  validate: (value) => /[a-zA-Z]/.test(value),
});

extend('password-spchar', {
  message: '記号を含めてください',
  validate: (value) => /[!-/:-@[-`{-~]/.test(value),
});

extend('password-invalid', {
  message: 'パスワードが有効ではありません',
  validate: (value) => /^([a-zA-Z0-9!-/:-@[-`{-~]{8,})*$/.test(value),
});
