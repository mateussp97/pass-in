import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'
import { Unauthorized } from '../routes/_errors/unauthorized'

export interface JwtPayload {
  id: string
  role: string
  email: string
}

export const jwtAuth = fp(async (app: FastifyInstance) => {
  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'pass-in-secret',
    sign: {
      expiresIn: '7d',
    }
  })

  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      throw new Unauthorized('Invalid or expired token')
    }
  })

  app.decorate('authorizeAdmin', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
      const user = request.user as JwtPayload
      
      if (user.role !== 'ADMIN') {
        throw new Unauthorized('Only admin users can access this resource')
      }
    } catch (err) {
      if (err instanceof Unauthorized) {
        throw err
      }
      throw new Unauthorized('Invalid or expired token')
    }
  })
})