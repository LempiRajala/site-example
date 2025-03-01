import { Injectable } from '@nestjs/common';
import { CreateArticleDto, GetManyArticleDto, UpdateArticleDto } from './dto';
import { db } from 'src/db';
import { articleTable } from 'src/db/schema';
import { asc, eq } from 'drizzle-orm';

@Injectable()
export class ArticlesService {
  async create(data: CreateArticleDto) {
    let [article] = await db
      .insert(articleTable)
      .values(data)
      .returning();

    if(!data.url) {
      await this.update(article.id, { url: article.id.toString() });
    }

    return article;
  }

  getMany(query: GetManyArticleDto) {
    return db
      .select()
      .from(articleTable)
      .orderBy(asc(articleTable.id))
      .limit(query.limit)
      .offset(query.offset);
  }

  async get(id: number) {
    const list = await db
      .select()
      .from(articleTable)
      .where(eq(articleTable.id, id));
    return list.at(0) ?? null;
  }

  async update(id: number, data: UpdateArticleDto) {
    const [article] = await db
      .update(articleTable)
      .set(data)
      .where(eq(articleTable.id, id))
      .returning();
    return article;
  }

  async remove(id: number) {
    const list = await db
      .delete(articleTable)
      .where(eq(articleTable.id, id))
      .returning();
    return list.at(0) ?? null;
  }

  async getArticleByUrl(url: string) {
    const list = await db
      .select()
      .from(articleTable)
      .where(eq(articleTable.url, url))
      .limit(1);
    return list.at(0) ?? null;
  }
}
