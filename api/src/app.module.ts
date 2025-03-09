import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { ValuesModule } from './values/values.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [ArticlesModule, ValuesModule, FilesModule],
})
export class AppModule {}
