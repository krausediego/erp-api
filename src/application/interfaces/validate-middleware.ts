import { AnyObjectSchema } from 'yup';

export namespace ValidateMiddleware {
  export interface Data {
    body: Record<string, any>;
    params: any;
    schema: AnyObjectSchema;
  }
}
