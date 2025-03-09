import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { db } from '../db';
import * as Minio from 'minio'
import { getMinioHost, getMinioPort, getMinioRootPassword, getMinioRootUser } from '@config';
import { getHash } from '../utils';
import { fileTable } from '../db/schema/file';
import { eq } from 'drizzle-orm';
import { isError } from 'lodash';

export enum BUCKETS {
  DEFAULT = 'default',
}

@Injectable()
export class FilesService implements OnModuleInit {
  private minio: Minio.Client;

  async onModuleInit() {
    this.minio = new Minio.Client({
      endPoint: getMinioHost(),
      port: +getMinioPort(),
      useSSL: false,
      accessKey: getMinioRootUser(),
      secretKey: getMinioRootPassword(),
    });

    if(!await this.minio.bucketExists(BUCKETS.DEFAULT)) {
      await this.minio.makeBucket(BUCKETS.DEFAULT);
    }
  }

  private isNoSuchKeyError(e: unknown) {
    return (
      typeof e === 'object' &&
      e !== null &&
      'code' in e &&
      e.code === 'NoSuchKey'
    )
  }

  async create(file: Express.Multer.File) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const hash = getHash(file.buffer);
    
    const records = await db
      .insert(fileTable)
      .values({ hash, mimeType: file.mimetype })
      .returning();

    if(!await this.hasByHash(hash)) {
      await this.minio.putObject(
        BUCKETS.DEFAULT,
        hash,
        file.buffer,
        file.buffer.byteLength,
        { 'Content-Type': file.mimetype },
      );
    }

    return records[0];
  }

  async hasByHash(hash: string) {
    try {
      await this.minio.statObject(BUCKETS.DEFAULT, hash);
      return true;
    } catch(e: unknown) {
      if(!this.isNoSuchKeyError(e)) {
        console.error(e);
      }
      return false;
    }
  }

  async get(id: string) {
    const records = await db
      .select()
      .from(fileTable)
      .where(eq(fileTable.id, id));
    const record = records.at(0);
    return record ?? null;
  }

  async getObject(hash: string) {
    try {
      return await this.minio.getObject(BUCKETS.DEFAULT, hash);
    } catch(e) {
      if(!this.isNoSuchKeyError(e)) {
        console.log(e);
      }
      throw new NotFoundException();
    }
  }
}
