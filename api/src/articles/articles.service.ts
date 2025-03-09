import { Injectable } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { db, articleTable } from '../db';
import { asc, eq } from 'drizzle-orm';
import { Subject } from 'rxjs';

@Injectable()
export class ArticlesService {
  private readonly articleUpdateEvents: Record<string, {
    conns: number,
    emitter: Subject<{
      data: typeof articleTable.$inferSelect,
    }>,
  }> = {};

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

  unwatchUpdates(id: number) {
    if(!(id in this.articleUpdateEvents)) return;
    this.articleUpdateEvents[id].conns--;
    if(this.articleUpdateEvents[id].conns <= 0) {
      delete this.articleUpdateEvents[id];
    }
  }

  watchUpdates(id: number) {
    if (!this.articleUpdateEvents[id]) {
      this.articleUpdateEvents[id] = {
        conns: 1,
        emitter: new Subject(),
      }
    }

    return this.articleUpdateEvents[id].emitter.asObservable();
  }

  emitArticleUpdate(
    id: number,
    changes: typeof articleTable.$inferSelect,
  ) {
    if(!(id in this.articleUpdateEvents)) return;
    this.articleUpdateEvents[id].emitter.next({ data: changes });
  }

  getMany(query: { limit: number, offset: number }) {
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

    this.emitArticleUpdate(id, article);
    
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
