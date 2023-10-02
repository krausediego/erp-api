import * as yup from 'yup';

export const createClientValidateSchema = yup.object({
  body: yup.object({
    client: yup
      .object({
        name: yup.string().required('O nome é obrigatório'),
        email: yup.string().email('Informe um email válido'),
        status: yup.bool(),
        phone: yup.string().required('O número de telefone é obrigatório'),
        type: yup.mixed().oneOf(['FISICO', 'JURIDICO']),
        birthDate: yup.date().when('type', (type, schema) => {
          if (type[0] === 'FISICO') {
            return schema.required('A data de nascimento é obrigatória');
          }
          return schema;
        }),
        genre: yup.string().when('type', (type, schema) => {
          if (type[0] === 'FISICO') {
            return schema.required('O sexo é obrigatório');
          }
          return schema;
        }),
        cpf: yup.string().when('type', (type, schema) => {
          if (type[0] === 'FISICO') {
            return schema.required('O CPF é obrigatório');
          }
          return schema;
        }),
        cnpj: yup.string().when('type', (type, schema) => {
          if (type[0] === 'JURIDICO') {
            return schema.required('O CNPJ é obrigatório');
          }
          return schema;
        }),
        inscricaoEstadual: yup.string().when('type', (type, schema) => {
          if (type[0] === 'JURIDICO') {
            return schema.required('A Inscricao Estadual é obrigatória');
          }
          return schema;
        }),
        razaoSocial: yup.string().when('type', (type, schema) => {
          if (type[0] === 'JURIDICO') {
            return schema.required('A Razao Social é obrigatória');
          }
          return schema;
        }),
        userId: yup.string().required('ID usuário obrigatório'),
      })
      .required('Dados do cliente obrigatórios'),
    address: yup
      .object({
        address: yup.string().required('O nome da rua é obrigatório'),
        district: yup.string().required('O bairro é obrigatório'),
        uf: yup.string().required('O UF é obrigatório'),
        cep: yup.string(),
        city: yup.string().required('A cidade é obrigatória'),
        number: yup.number(),
        reference: yup.string(),
      })
      .required('Dados do endereço obrigatórios'),
  }),
});
