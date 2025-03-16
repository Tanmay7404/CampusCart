import express from "express";
import debug from "debug";
const log: debug.IDebugger = debug("app:users-controller");

class ItemMiddleware {
	async extractItemId(req: express.Request, res: express.Response, next: express.NextFunction) {
		req.body.itemId = req.params.itemId;
		next();
	}
}
export default new ItemMiddleware();
