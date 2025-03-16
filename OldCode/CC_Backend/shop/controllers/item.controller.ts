import express from "express";
import argon2 from "argon2";
import debug from "debug";
import itemServices from "../services/item.services";
const log: debug.IDebugger = debug("app:users-controller");
export class ItemController {
    async createItem(req:express.Request,res:express.Response){
        const { name, price, category, shopId} = req.body;
        const newItem = await itemServices.createItem({
            name:name,
            price:price,
            category:category,
            Shop:{
                connect:{
                    id:shopId
                }
            }
        })
        res.status(200).send(newItem);
    }
    async deleteItemById(req:express.Request,res:express.Response){
        const {itemId} = req.body;
        await itemServices.deleteItemById(itemId);
        res.status(204).send();
    }
    async updateItemById(req:express.Request,res:express.Response){
        const {itemId}= req.body;
        const updateItemParameter = req.body;
        const updatedItem = itemServices.updateItemById(itemId,updateItemParameter);
        res.status(200).send(updatedItem);
    }
	async getAllItems(req: express.Request, res: express.Response) {
		const items = await itemServices.list(100, 0);
		res.status(200).send(items);
	}
	async getItemById(req: express.Request, res: express.Response) {
        const itemId = req.body.id;
		const item = await itemServices.readById(itemId);
		res.status(200).send(item);
	}
}
export default new ItemController();
