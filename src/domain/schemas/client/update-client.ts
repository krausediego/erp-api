import * as yup from 'yup';

export const updateClientValidateSchema = yup.object({
  params: yup.object({
    clientId: yup
      .string()
      .typeError('O parâmetro precisa ser uma string')
      .required('ID do cliente obrigatório.'),
  }),
  body: yup.object({
    client: yup
      .object({
        name: yup.string(),
        email: yup.string().email('Informe um email válido'),
        status: yup.bool(),
        phone: yup.string(),
        birthDate: yup.date(),
        genre: yup.string(),
        cpf: yup.string(),
        cnpj: yup.string(),
        inscricaoEstadual: yup.string(),
        razaoSocial: yup.string(),
      })
      .required('Dados do cliente obrigatórios'),
    addresses: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            id: yup.string().required('ID do endereço obrigatório'),
            address: yup.string(),
            district: yup.string(),
            uf: yup.string(),
            cep: yup.string(),
            city: yup.string(),
            number: yup.number(),
            reference: yup.string(),
          })
          .required('Endereço obrigatório'),
      )
      .typeError('Endereços deve ser um array'),
  }),
});
