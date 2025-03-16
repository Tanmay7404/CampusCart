export interface CreateUserDto {
	fullName :string;
	email: string;
	password: string;
	permissionLevel?: number;
}
