import * as env from 'env-var';

export default {
  secret: env.get('JWT_SECRET').required().asString(),
} as const;
