import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PermissionFlag } from "../../common/middleware/common.permissionflag.enum";
import { PrismaClient, Prisma } from "@prisma/client";

import shortid from "shortid";
import debug from "debug";
const log: debug.IDebugger = debug("app:in-memory-dao");

const prisma = new PrismaClient();

class UserDao {
	users: Array<CreateUserDto> = [];
	constructor() {
		log("Created new instance of UserDao");
	}

	async addUser(userFields: Prisma.UserCreateInput) {
		const userId = shortid.generate();
		const user = await prisma.user.create({
			data: {
				id: userId,
				...userFields,
			},
		});
		log(user);
		return user;
	}
	async updateUserById(userId: string, userFields: Prisma.UserUpdateInput) {
		const existingUser = await prisma.user.update({
			where: {
				id: userId,
			},
			data: userFields,
		});
		return existingUser;
	}

	async getUserByEmail(email: string) {
		return (await prisma.user.findUnique({
			where: {
				email: email,
			},
		}));
	}
	async getUserById(id: string) {
		return (await prisma.user.findUnique({
			where: {
				id: id,
			},
		}));
	}

	async updateUserByEmail(email: string, input: Prisma.UserUpdateInput) {
		return (await prisma.user.update({
			where: {
				email: email,
			},
			data: input,
		}));
	}
	async getUserByEmailWithPassword(email: string) {
		return (await prisma.user.findUnique({
			where: {
				email: email,
			},
		}));
	}
	async getUsers(limit = 25, page = 0) {
		return (await prisma.user.findMany({
			skip: page * limit,
			take: limit,
		}));
	}
	async removeUserById(userId: string) {
		return (await prisma.user.delete({
			where: {
				id: userId,
			},
		}));
	}

}
export default new UserDao()
