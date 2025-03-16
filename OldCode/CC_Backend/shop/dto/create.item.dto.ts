export interface CreateItemDto {
	name: string;
	description?: string;
	location?: string;
	shopId: string;
    image?: string;
    price: Number;
}
//Update this dto as according later on