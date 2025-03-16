import { Prisma } from "@prisma/client";
import shopDao from "../dao/shop.dao";

export class ShopServices {
	async createShop(resource:Prisma.ShopCreateInput):Promise<any>{
		return shopDao.createShop(resource);
	}
	async list(limit: number, page: number): Promise<any> {
		return shopDao.getAllShops(limit, page);
	}
	async readById(id: string): Promise<any> {
		return shopDao.getShopById(id);
	}
	async getAllShopItems(id: string): Promise<any> {
		return shopDao.getAllShopItems(id);
	}
	async updateShopById(id:string, resource: Prisma.ShopUpdateInput):Promise<any>{
		return shopDao.updateShopById(id,resource);
	}
	async getShopByCategory(subcategory: string): Promise<any> {
		return shopDao.getShopByCategory(subcategory);
	}
}
export default new ShopServices();