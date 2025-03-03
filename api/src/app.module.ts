import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { ValuesModule } from './values/values.module';

@Module({
  imports: [ArticlesModule, ValuesModule],
})
export class AppModule {}
