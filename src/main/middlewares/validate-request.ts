import { AnyObjectSchema } from 'yup';

import { adaptMiddleware } from '@/main/adapters';
import { makeValidateRequestMiddleware } from '@/main/factories/application/middlewares';

export const validateRequest = (schema: AnyObjectSchema) => {
  return adaptMiddleware(makeValidateRequestMiddleware(), schema);
};
