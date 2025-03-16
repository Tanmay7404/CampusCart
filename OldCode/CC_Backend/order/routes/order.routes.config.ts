import { CommonRoutesConfig } from "../../common/routes/common.routes.config";
import express from "express";
import orderContoller from "../controllers/order.contoller";
import orderMiddleware from "../middlewares/order.middleware";

export class OrderRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, "OrderRoutes");
	}

	configureRoutes(): express.Application {
		this.app
			.route(`/order`)
			// .all(jwtMiddleware.validJWTNeeded)
			.post(orderContoller.createOrder)
			.get(orderContoller.listOrders);
		     this.app.param(`orderId`, orderMiddleware.extractOrderId);
		     this.app
			.route(`/order/:orderId`)
			// .all(jwtMiddleware.validJWTNeeded)
			.get(orderContoller.getOrderById)
			.delete(orderContoller.deleteOrder)
			.patch(orderContoller.updateOrder);
		return this.app;
	}
}
