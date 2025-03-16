import express from "express";
import debug from "debug";
const log: debug.IDebugger = debug("app:users-controller");

class ShopMiddleware {
	async extractShopId(req: express.Request, res: express.Response, next: express.NextFunction) {
		req.body.shopId = req.params.shopId;
		next();
	}
}
export default new ShopMiddleware();
