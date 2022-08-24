export const SIGNIN_INPUTS = [
  {
    name: 'signin-name',
    type: 'text',
    label: 'Имя',
    placeholder: 'Вася',
    errorMessage: 'Введите имя',
  },
  {
    name: 'signin-email',
    type: 'email',
    label: 'Почта',
    placeholder: 'example@gmail.com',
    errorMessage: 'Введите корректный адрес почты',
  },
  {
    name: 'signin-password',
    type: 'password',
    label: 'Пароль',
    placeholder: 'Не менее 8 символов',
    errorMessage: 'Пароль должен содержать не менее 8 символов',
  },
];

export const LOGIN_INPUTS = [
  {
    name: 'login-email',
    type: 'email',
    label: 'Почта',
    placeholder: 'example@gmail.com',
    errorMessage: 'Введите корректный адрес почты',
  },
  {
    name: 'login-password',
    type: 'password',
    label: 'Пароль',
    placeholder: 'Не менее 8 символов',
    errorMessage: 'Пароль должен содержать не менее 8 символов',
  },
];
