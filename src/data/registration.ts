const LOGIN_INPUTS = [
  {
    name: 'name',
    type: 'text',
    label: 'Имя',
    placeholder: 'Вася',
    errorMessage: 'Введите имя',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Почта',
    placeholder: 'example@gmail.com',
    errorMessage: 'Введите корректный адрес почты',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Пароль',
    placeholder: 'Не менее 8 символов',
    errorMessage: 'Пароль должен содержать не менее 8 символов',
  },
];

export default LOGIN_INPUTS;
