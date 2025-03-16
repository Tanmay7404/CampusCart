import { log } from "winston";
import { CRUD } from "../../common/interfaces/crud.interface";
import orderDao from "../dao/order.dao";
import { CreateOrderDto } from "../dto/create.order.dto";
import { Prisma } from "@prisma/client";

class OrderService implements CRUD {
	async create(resource: Prisma.OrderCreateInput) {
		return orderDao.addOrder(resource);
	}
	async deleteById(id: string): Promise<any> {
		return orderDao.removeOrderById(id);
	}
	async list(limit: number, page: number): Promise<any> {
		return orderDao.getOrders(limit, page);
	}
	async patchById(id: string,userFields: Prisma.OrderUpdateInput): Promise<any> {
		return orderDao.updateOrderById(id,userFields);
	}
	async putById(id: string,userFields:Prisma.OrderUpdateInput): Promise<any> {
		return orderDao.updateOrderById(id,userFields);
	}
	async readById(id: string): Promise<any> {
		return orderDao.getOrderById(id);
	}
}
export default new OrderService();
