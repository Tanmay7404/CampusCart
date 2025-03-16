import express from "express";
// import userService from "../services/users.service";
import debug from "debug";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const log: debug.IDebugger = debug("app:users-controller");
class UsersMiddleware {
	async validateSameEmailBelongToSameUser(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (res.locals.user._id === req.params.userId) {
			next();
		} else {
			res.status(400).send({ error: `Invalid email` });
		}
	}

	// Here we need to use an arrow function to bind `this` correctly
	validatePatchEmail = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		if (req.body.email) {
			log("Validating email", req.body.email);

			this.validateSameEmailBelongToSameUser(req, res, next);
		} else {
			next();
		}
	};

	async userCantChangePermission(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (
			"permissionFlags" in req.body &&
			req.body.permissionFlags !== res.locals.user.permissionFlags
		) {
			res.status(400).send({
				errors: ["User cannot change permission flags"],
			});
		} else {
			next();
		}
	}
	async extractUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
		req.body.id = req.params.user_id;
		next();
	}
	async validateAuthorizationHeader(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (req.headers.authorization) {
			next();
		} else {
			res.json({ success: false, errorMessage: "Authorization header not found" });
		}
	}
}

export default new UsersMiddleware();
