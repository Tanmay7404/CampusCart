import {PrismaClient, Prisma} from "@prisma/client";
const prisma = new PrismaClient();
import shortid from "shortid";
import debug from "debug";
const log: debug.IDebugger = debug("app:in-memory-dao");

class itemDao {
    async addItem(itemFields: Prisma.ItemCreateInput) {
		const itemId = shortid.generate();
		const item = await prisma.item.create({
			data: {
				id: itemId,
				...itemFields,
			},
		});
		return item;
	}
	async getItemById(itemId: string) {
		return (
			await prisma.item.findUnique({
				where: {
					id: itemId,
				},
			})
		);
	}
	async getAllItems(limit = 25, page = 0) {
		return (
			await prisma.item.findMany({
				skip: page * limit,
				take: limit,
			})
		);
	}
    async removeItemById(itemId: string) {
		return (await prisma.item.delete({
			where: {
				id: itemId,
			},
		}));
	}
    async updateItemById(itemId:string, itemFields:Prisma.ItemUpdateInput){
        return (await prisma.item.update({
            where:{
                id:itemId,
            },
            data:itemFields
        }))
    }
    
}
export default new itemDao();
