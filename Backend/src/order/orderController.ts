import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// export const deliverOrder = async (req: Request, res: Response) => {
//   const { order } = req.body;

//   try {
//     // const savedOrder = await prisma.order.create({
//     //   data: {
//     //     userId: order.userId,
//     //     shopId: order.shopkeeperId,
//     //     items: order.items,
//     //     total: order.total
//     //   },
//     // });
//     // res.status(200).json(savedOrder);

//     // impl change
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to save order' });
//   }
// };

export const getOrdersForShopkeeper = async (req: Request, res: Response) => {
  const { shopkeeperId } = req.params;

  try {
    const orders = await prisma.orders.findMany({
      where: {shopId: shopkeeperId},
      orderBy: {createdAt: 'desc'},
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};