import { CommonRoutesConfig } from "../../common/routes/common.routes.config";
import bodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import express from "express";
import { body } from "express-validator";
import { PermissionFlag } from "../../common/middleware/common.permissionflag.enum";
import permissionMiddleware from "../../common/middleware/common.permission.middleware";
import shopContoller from "../controllers/shop.contoller";
import shopMiddleware from "../middleware/shop.middleware";

export class ShopRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ShopRoutes");
  }
  configureRoutes(): express.Application {
    //create shop
    //update shop
    this.app.route("/api/shop").post(shopContoller.createShop);
    this.app.route("/api/shop/allShops").get(shopContoller.getAllShops);
    this.app.param(`shopId`, shopMiddleware.extractShopId);
    this.app
      .route(`/api/shop/:shopId`)
      .get([shopContoller.getShopById])
      .patch([shopContoller.updateShopById])
      .delete([shopContoller.deleteShopById]);

    this.app.get(`/api/shop/:shopId/items`, [shopContoller.getAllShopItems]);
    this.app.get(`/api/shop/shopByCategory/:subcategory`, [shopContoller.getShopByCategory]);
    return this.app;
  }
}
