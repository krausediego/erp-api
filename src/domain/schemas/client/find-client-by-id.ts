import * as yup from 'yup';

export const findClientByIdValidateSchema = yup.object({
  params: yup.object({
    clientId: yup
      .string()
      .typeError('O parâmetro precisa ser uma string')
      .required('ID do cliente obrigatório.'),
  }),
});
