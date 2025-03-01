import { ApiProperty } from "@nestjs/swagger";
import { maxArticlesToRequest } from "src/const ";

export class CreateArticleDto {
	@ApiProperty({ type: 'string' })
	title: string;

	@ApiProperty({ type: 'string' })
	url: string;

	@ApiProperty({ type: 'string' })
	content: string;

	@ApiProperty({ type: 'string' })
	metaDescription: string;
	
	@ApiProperty({ type: 'string' })
	metaKeywords: string;
}

export class UpdateArticleDto {
	@ApiProperty({ type: 'string', required: false })
	title?: string;

	@ApiProperty({ type: 'string', required: false })
	url?: string;

	@ApiProperty({ type: 'string', required: false })
	content?: string;

	@ApiProperty({ type: 'string', required: false })
	metaDescription?: string;
	
	@ApiProperty({ type: 'string', required: false })
	metaKeywords?: string;
}

export class GetManyArticleDto {
	@ApiProperty({ type: 'number' })
	limit: number;

	@ApiProperty({ type: 'number' })
	offset: number;
}