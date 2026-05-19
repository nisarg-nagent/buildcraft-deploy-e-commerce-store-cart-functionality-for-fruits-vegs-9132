import type { FastifyInstance } from 'fastify';
import healthRoutes from './health.js';
import authRoutes from './auth.js';
import productsRoutes from './products.js';
import cartRoutes from './cart.js';
import ordersRoutes from './orders.js';

/** Registers all HTTP API plugins (health + feature routes). */
export async function registerRoutes(app: FastifyInstance): Promise<void> {
  await app.register(healthRoutes, { prefix: '/api' });
  await app.register(authRoutes, { prefix: '/api' });
  await app.register(productsRoutes, { prefix: '/api' });
  await app.register(cartRoutes, { prefix: '/api' });
  await app.register(ordersRoutes, { prefix: '/api' });
}
