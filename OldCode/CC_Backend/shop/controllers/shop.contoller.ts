import express from "express";
import argon2 from "argon2";
import debug from "debug";
import shopServices from "../services/shop.services";
import usersService from "../../users/services/users.service";
const log: debug.IDebugger = debug("app:users-controller");
export class ShopController {
  async createShop(req: express.Request, res: express.Response) {
    const { name, phoneNumber } = req.body;
    const shop = await shopServices.createShop({
      name: name,
      phone_number: phoneNumber,
    });
    res.status(200).send(shop);
  }
  async updateShopById(req: express.Request, res: express.Response) {
    const { shopId } = req.body;
    const updateShopParamter = req.body;
    const updatedShop = await shopServices.updateShopById(
      shopId,
      updateShopParamter
    );
    res.status(200).send(updatedShop);
  }
  async getAllShops(req: express.Request, res: express.Response) {
    const shops = await shopServices.list(100, 0);
    res.status(200).send(shops);
  }
  async getShopById(req: express.Request, res: express.Response) {
    const { shopId } = req.params;
    const shop = await shopServices.readById(shopId);
    res.status(200).send(shop);
  }
  async getAllShopItems(req: express.Request, res: express.Response) {
    const { shopId } = req.params;
    const shopItems = await shopServices.getAllShopItems(shopId);
    res.status(200).send(shopItems);
  }
  async deleteShopById(req: express.Request, res: express.Response) {
    const { shopId } = req.body;
    await usersService.deleteById(shopId);
    res.status(204).send();
  }
  async getShopByCategory(req: express.Request, res: express.Response) {
    const { subcategory } = req.params;
    console.log(subcategory);
    const shop = await shopServices.getShopByCategory(subcategory);
    res.status(200).send(shop);
  }
}
export default new ShopController();
