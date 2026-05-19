import type { FastifyPluginAsync } from 'fastify';
import { prisma } from '../config/database.js';

const ordersRoutes: FastifyPluginAsync = async (app) => {
  app.get('/orders', async () => {
    const orders = await prisma.order.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: orders.map((order) => ({
        id: order.orderNumber,
        customer: order.user.name || order.user.email,
        total: `$${order.total.toFixed(2)}`,
        status: order.status.toLowerCase(),
        date: order.createdAt.toISOString().slice(0, 10),
      })),
    };
  });
};

export default ordersRoutes;