import { Prisma, PrismaClient } from "@prisma/client";
import shortid from "shortid";
const prisma = new PrismaClient();


class shopDao {
	async createShop(resourceFields:Prisma.ShopCreateInput){
		const shopId= shortid.generate();
		return (
			await prisma.shop.create({
				data:{
					id:shopId,
					...resourceFields
				}
			})
		)
	}
	async updateShopById(shopId:string, shopFields:Prisma.ShopUpdateInput){
        return (await prisma.shop.update({
            where:{
                id:shopId,
            },
          data:shopFields,
        }))
    }
	async deleteShopById(shopId:string){
		return (await prisma.shop.delete({
			where:{
				id:shopId
			}
		}))
	}
	async getShopById(shopId: string) {
		return (
			await prisma.shop.findUnique({
				where: {
					id: shopId,
				},
			})
		);
	}
	async getAllShops(limit = 25, page = 0) {
		return (
			await prisma.shop.findMany({
				skip: page * limit,
				take: limit,
			})
		);
	}
	async getAllShopItems(shopId: string) {
		return (
			await prisma.shop.findUnique({
				where: {
					id: shopId,
				},
				include: {
					menu: true,
				},
			})
		)
	}
	async getShopByCategory(subcategory: string) {
		return (
			await prisma.shop.findMany({
				where: {
					subCategory: subcategory,
				},
			})
		);
	}
}
export default new shopDao();
