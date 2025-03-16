import { CreateOrderDto } from "../dto/create.order.dto";
import { PatchOrderDto } from "../dto/patch.order.dto";
import { PrismaClient, Prisma } from "@prisma/client";

import debug from "debug";
const log: debug.IDebugger = debug("app:in-memory-order-dao");
const prisma = new PrismaClient();

class OrdersDao {
  async addOrder(orderFields: Prisma.OrderCreateInput) {
    await prisma.order.create({
      data: {
        ...orderFields,
      },
    });
  }
  async getOrderById(userId: string) {
    return await prisma.order.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async getOrders(limit = 25, page = 0) {
    await prisma.order.findMany({
      skip: page * limit,
      take: limit,
    });
  }
  async updateOrderById(orderId: string, orderFields: Prisma.OrderUpdateInput) {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: orderFields,
    });
  }
  async removeOrderById(orderId: string) {
    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  }
}
export default new OrdersDao();
