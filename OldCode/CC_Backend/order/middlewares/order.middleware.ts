import express from "express";
import debug from "debug";
const log = debug("app:common-middleware");

class OrderMiddleware {
	async extractOrderId(req: express.Request, res: express.Response, next: express.NextFunction) {
		req.body.orderId = req.params.orderId;
		next();
	}
}
export default new OrderMiddleware();
