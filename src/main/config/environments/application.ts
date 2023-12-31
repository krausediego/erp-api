import * as env from 'env-var';

export default {
  mode: env.get('NODE_ENV').default('development').asString(),
  port: env.get('PORT').default('1234').asPortNumber(),
} as const;
