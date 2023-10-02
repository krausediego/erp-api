import * as yup from 'yup';

export const registerValidateSchema = yup.object({
  body: yup.object({
    username: yup.string().required('Nome de usuário obrigatório'),
    email: yup
      .string()
      .email('Informe um email válido')
      .required('Email obrigatório'),
    password: yup.string().required('Senha obrigatória'),
  }),
});
