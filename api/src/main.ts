import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { setupSwagger } from './swagger';
import { getAllowedOrigins, getNodeEnv, getPort } from '@config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: getAllowedOrigins(),
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  if(getNodeEnv() === 'development') {
    setupSwagger(app);
  }

  await app.listen(getPort(), () => console.log(`Server running on port: ${getPort()}`));
}
bootstrap();
