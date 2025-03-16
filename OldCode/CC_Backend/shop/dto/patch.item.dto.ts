import { CreateItemDto } from "./create.item.dto";
export interface PatchItemDto extends Partial<CreateItemDto> {}
