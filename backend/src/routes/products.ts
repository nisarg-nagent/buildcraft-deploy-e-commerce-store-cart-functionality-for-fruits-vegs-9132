import type { FastifyPluginAsync } from 'fastify';
import { prisma } from '../config/database.js';

const productsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/products', async () => {
    const products = await prisma.product.findMany({ orderBy: { name: 'asc' } });

    return {
      success: true,
      data: products.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: `$${product.price.toFixed(2)}/${product.unit}`,
        stock: product.stock,
        status: product.status,
        accent: product.accent,
      })),
    };
  });

  app.post('/products', async (request, reply) => {
    const body = request.body as {
      name?: string;
      category?: string;
      price?: number;
      unit?: string;
      stock?: number;
      status?: string;
      accent?: string;
    };

    if (!body.name || !body.category || typeof body.price !== 'number' || !body.unit) {
      return reply.status(400).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Name, category, price, and unit are required' },
      });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        category: body.category,
        price: body.price,
        unit: body.unit,
        stock: body.stock ?? 0,
        status: body.status ?? 'active',
        accent: body.accent ?? '#22c55e',
      },
    });

    return { success: true, data: product };
  });
};

export default productsRoutes;