import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { setupCors } from './infrastructure/setupCors';
import { setupValidationPipe } from './infrastructure/setupPipes';
import { setupSwagger } from './infrastructure/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupCors(app)
  setupValidationPipe(app)
  setupSwagger(app)
  const configService = app.get(ConfigService);
  const port: string = configService.get<string>('PORT', '4000');
  await app.listen(port, () => {
    Logger.log(`Listening at http://127.0.0.1:${port}/`);
    Logger.log(`===================================`);
  });

}
bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  process.exit(1);
});
