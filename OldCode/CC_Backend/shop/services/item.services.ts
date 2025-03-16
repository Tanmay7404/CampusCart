import { Prisma } from "@prisma/client";
import itemDao from "../dao/item.dao";

export class ItemServices {
	async list(limit: number, page: number): Promise<any> {
		return itemDao.getAllItems(limit,page);
	}
	async readById(id: string): Promise<any> {
		return itemDao.getItemById(id);
	}
	async createItem(resource: Prisma.ItemCreateInput):Promise<any>{
        return itemDao.addItem(resource);
    }
    async deleteItemById(id:string):Promise<any>{
        return itemDao.removeItemById(id);
    }
    async updateItemById(id:string, resource:Prisma.ItemUpdateInput):Promise<any>{
        return itemDao.updateItemById(id,resource);
    }
}
export default new ItemServices();
