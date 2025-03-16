import { PutUserDto } from "./put.user.dto";
//partial makes all properties optional of the PutUserDto interface.
export interface PatchUserDto extends Partial<PutUserDto> {}
//fdsf
