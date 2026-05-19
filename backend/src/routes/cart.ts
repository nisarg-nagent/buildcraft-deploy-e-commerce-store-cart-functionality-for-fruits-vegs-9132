import type { FastifyPluginAsync } from 'fastify';
import { prisma } from '../config/database.js';

async function getDemoUser() {
  return prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: 'demo123',
      name: 'Demo Admin',
      role: 'admin',
    },
  });
}

const cartRoutes: FastifyPluginAsync = async (app) => {
  app.get('/cart', async () => {
    const user = await getDemoUser();
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: { product: true },
      orderBy: { createdAt: 'asc' },
    });

    return {
      success: true,
      data: {
        items: cartItems.map((item) => ({
          id: item.id,
          productId: item.productId,
          name: item.product.name,
          qty: item.quantity,
          price: item.product.price,
          unit: item.product.unit,
        })),
      },
    };
  });

  app.post('/cart/items', async (request, reply) => {
    const body = request.body as { productId?: string; quantity?: number };
    const user = await getDemoUser();

    if (!body.productId || typeof body.quantity !== 'number') {
      return reply.status(400).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Product and quantity are required' },
      });
    }

    const cartItem = await prisma.cartItem.upsert({
      where: { userId_productId: { userId: user.id, productId: body.productId } },
      update: { quantity: body.quantity },
      create: { userId: user.id, productId: body.productId, quantity: body.quantity },
      include: { product: true },
    });

    return {
      success: true,
      data: {
        id: cartItem.id,
        productId: cartItem.productId,
        name: cartItem.product.name,
        qty: cartItem.quantity,
        price: cartItem.product.price,
        unit: cartItem.product.unit,
      },
    };
  });
};

export default cartRoutes;