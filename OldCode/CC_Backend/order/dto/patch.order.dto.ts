import { CreateOrderDto } from "./create.order.dto";
export interface PatchOrderDto extends Partial<CreateOrderDto> {}
