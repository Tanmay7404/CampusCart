import { CommonRoutesConfig } from "../../common/routes/common.routes.config";
import bodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import express from "express";
import { body } from "express-validator";
import itemController from "../controllers/item.controller";
import itemMiddleware from "../middleware/item.middleware";

export class ItemRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ItemRoutes");
  }
  configureRoutes(): express.Application {
    this.app.route("/api/item").post(itemController.createItem);
    this.app.route("/api/item/allItems").get(itemController.getAllItems);
    this.app.param(`itemId`, itemMiddleware.extractItemId);
    this.app
      .route(`/api/item/:itemId`)
      .get([itemController.getItemById])
      .delete([itemController.deleteItemById])
      .patch([itemController.updateItemById]);
    //update item
    return this.app;
  }
}
