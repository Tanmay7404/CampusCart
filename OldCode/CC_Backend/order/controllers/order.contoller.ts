import express from "express";
import debug from "debug";
import orderServices from "../services/order.services";
import { CreateOrderDto } from "../dto/create.order.dto";
import { PatchOrderDto } from "../dto/patch.order.dto";
import pubSubServices from "../../MessageQueue/pubSub.services";
import sendNotification from "../../NotificationService/notificationService";
import { Prisma } from "@prisma/client";

const log: debug.IDebugger = debug("app:order-controller");

class OrderController {
	async listOrders(req: express.Request, res: express.Response) {
		const orders = await orderServices.list(100, 0);
		res.status(200).send(orders);
	}
	async getOrderById(req: express.Request, res: express.Response) {
		const { orderId } = req.params;
		const order = await orderServices.readById(orderId);
		res.status(200).send(order);
	}
	async createOrder(req: express.Request, res: express.Response) {
		try {
			const order = req.body;
			await pubSubServices.publishToQueue("ORDER", order);
			res.status(201).send("Order Succesfully Placed");
			sendNotification();
		} catch (e) {
			log(e);
			//s
		}
	}
	async deleteOrder(req: express.Request, res: express.Response) {
		const { orderId } = req.params;
		await orderServices.deleteById(orderId);
		res.status(204).send();
	}
	async updateOrder(req: express.Request, res: express.Response) {
		const { orderId } = req.params;
		const order: Prisma.OrderUpdateInput = req.body;
		log(await orderServices.patchById(orderId, order));
		res.status(204).send();
	}
}
export default new OrderController();
