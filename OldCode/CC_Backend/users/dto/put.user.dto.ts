export interface PutUserDto {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	permissionFlags: number;
}
