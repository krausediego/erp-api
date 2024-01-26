import cors from '@elysiajs/cors'
import { Elysia } from 'elysia'

const app = new Elysia().use(
  cors({
    credentials: true,
    allowedHeaders: ['content-type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    origin: (request): boolean => {
      const origin = request.headers.get('origin')

      if (!origin) {
        return false
      }

      return true
    },
  }),
)

app.listen(3333)

console.log(
  `Http Server running at ${app.server?.hostname}:${app.server?.port}`,
)
