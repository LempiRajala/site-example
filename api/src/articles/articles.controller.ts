import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { maxArticlesToRequest } from 'src/const ';

@Controller('articles')
export class ArticlesController {
  @Inject() articles: ArticlesService;

  @Post()
  create(
    @Body() data: CreateArticleDto
  ) {
    if(data.url.length === 0) {
      throw new BadRequestException('url must contain at least one char');
    }

    return this.articles.create(data);
  }
  
  @Get()
  getMany(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    if(limit > maxArticlesToRequest) {
      throw new BadRequestException('limit is too big');
    }

    return this.articles.getMany({ limit, offset });
  }

  @Get(':id')
  async get(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const article = await this.articles.get(id);
    if(!article) {
      throw new NotFoundException();
    }

    return article;
  }

  @Get('/url/:url')
  async getByUrl(
    @Param('url') url: string,
  ) {
    const article = await this.articles.getArticleByUrl(url);
    if(!article) {
      throw new NotFoundException();
    }

    return article;
  }

  @Post(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return this.articles.update(id, updateArticleDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    const article = await this.articles.remove(id);
    if(!article) {
      throw new NotFoundException();
    }

    return article;
  }
}
