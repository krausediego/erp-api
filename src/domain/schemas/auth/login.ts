import * as yup from 'yup';

export const loginValidateSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email('Informe um email válido')
      .required('Email obrigatório'),
    password: yup.string().required('Senha obrigatória'),
  }),
});
