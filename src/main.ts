import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add validation input
  app.useGlobalPipes(new ValidationPipe());

  const configSwagger = new DocumentBuilder()
    .setTitle(`API AirBNB`)
    .setDescription('List AirBNB API')
    .setVersion('1.0')
    .addBearerAuth()
    .build(); //builder pattern

  const swagger = SwaggerModule.createDocument(app,configSwagger)
  SwaggerModule.setup("/",app, swagger)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
