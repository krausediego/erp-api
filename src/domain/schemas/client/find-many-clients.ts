import * as yup from 'yup';

export const findManyClientsValidateSchema = yup.object({
  params: yup.object({
    page: yup
      .number()
      .typeError('O parâmetro precisa ser um número')
      .required('Número da página obrigatório.'),
    limit: yup
      .number()
      .typeError('O parâmetro precisa ser um número')
      .required('Número do limite por página obrigatório'),
  }),
});
