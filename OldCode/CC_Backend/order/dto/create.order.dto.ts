export interface CreateOrderDto {
	total: number;
	userId: number;
	shopId: number;
	items: any[];
	isPayment: boolean;
	isAccepted: boolean;
	isDelivered: boolean;
	// bill: any;
}
