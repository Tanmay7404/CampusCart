import UsersDao from "../dao/users.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { Prisma } from "@prisma/client";

class UsersService implements CRUD {
	async create(resource: Prisma.UserCreateInput) {
		return UsersDao.addUser(resource);
	}

	async deleteById(id: string): Promise<any> {
		return UsersDao.removeUserById(id);
	}

	async list(limit: number, page: number): Promise<any> {
		return UsersDao.getUsers(limit, page);
	}

	async patchById(id: string, resource: Prisma.UserUpdateInput): Promise<any> {
		return UsersDao.updateUserById(id, resource);
	}

	async readById(id: string): Promise<any> {
		return UsersDao.getUserById(id);
	}

	async putById(id: string, resource: PutUserDto): Promise<any> {
		return UsersDao.updateUserById(id, resource);
	}

	async getUserByEmail(email: string): Promise<any> {
		return UsersDao.getUserByEmail(email);
	}
}

export default new UsersService();
