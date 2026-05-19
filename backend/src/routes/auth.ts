import type { FastifyPluginAsync } from 'fastify';
import { prisma } from '../config/database.js';

const ADMIN_ACCOUNT = {
  email: 'admin@freshcart.com',
  password: 'admin123',
  name: 'FreshCart Admin',
  role: 'admin',
};

const DEMO_ACCOUNT = {
  email: 'demo@example.com',
  password: 'demo123',
  name: 'Demo Admin',
  role: 'admin',
};

const BOOTSTRAP_ACCOUNTS = [ADMIN_ACCOUNT, DEMO_ACCOUNT];

const authRoutes: FastifyPluginAsync = async (app) => {
  app.post('/auth/login', async (request, reply) => {
    const body = request.body as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password || '';

    if (!email || !password) {
      return reply.status(400).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email and password are required' },
      });
    }

    const bootstrapAccount = BOOTSTRAP_ACCOUNTS.find((account) => account.email === email);
    let user = await prisma.user.findUnique({ where: { email } });

    if (bootstrapAccount) {
      user = await prisma.user.upsert({
        where: { email: bootstrapAccount.email },
        update: {
          password: bootstrapAccount.password,
          name: bootstrapAccount.name,
          role: bootstrapAccount.role,
        },
        create: {
          email: bootstrapAccount.email,
          password: bootstrapAccount.password,
          name: bootstrapAccount.name,
          role: bootstrapAccount.role,
        },
      });
    }

    if (!user || user.password !== password) {
      return reply.status(401).send({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Invalid email or password' },
      });
    }

    const token = app.jwt.sign({ sub: user.id, email: user.email, role: user.role });

    return {
      success: true,
      data: {
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      },
    };
  });
};

export default authRoutes;
