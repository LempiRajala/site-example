import { ApiProperty } from "@nestjs/swagger";
import { VALUES } from "../db";

export class SetValueDto {
	@ApiProperty({ type: 'string', enum: VALUES })
	key: string;
	
	@ApiProperty()
	value: Object;
}