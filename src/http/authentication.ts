import Elysia, { Static, t } from 'elysia'
import { UnauthorizedError } from './routes/errors/unauthorized-error'
import { NotAManagerError } from './routes/errors/not-a-manager-error'
import jwt from '@elysiajs/jwt'
import { env } from '@/env'
import cookie from '@elysiajs/cookie'

const jwtPayloadSchema = t.Object({
  sub: t.String(),
  clientId: t.Optional(t.String()),
})

export const authentication = new Elysia()
  .error({
    UNAUTHORIZED: UnauthorizedError,
    NOT_A_MANAGER: NotAManagerError,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'UNAUTHORIZED':
        set.status = 401
        return { code, message: error.message }
      case 'NOT_A_MANAGER':
        set.status = 400
        return { code, message: error.message }
    }
  })
  .use(
    jwt({
      name: 'jwt',
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayloadSchema,
    }),
  )
  .use(cookie())
  .derive(({ jwt, cookie, setCookie, removeCookie }) => {
    return {
      getCurrentUser: async () => {
        const payload = await jwt.verify(cookie.auth)

        if (!payload) {
          throw new UnauthorizedError()
        }

        return payload
      },
      signUser: async (payload: Static<typeof jwtPayloadSchema>) => {
        setCookie('auth', await jwt.sign(payload), {
          httpOnly: true,
          maxAge: 7 * 86400,
          path: '/',
        })
      },
      signOut: () => {
        removeCookie('auth')
      },
    }
  })
  .derive(({ getCurrentUser }) => {
    return {
      getManagedClientId: async () => {
        const { clientId } = await getCurrentUser()

        if (!clientId) {
          throw new NotAManagerError()
        }

        return clientId
      },
    }
  })
