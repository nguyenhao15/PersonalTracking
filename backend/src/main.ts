import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExpensesModule } from './modules/expenses-tracking/expenses/expenses.module';

async function bootstrap() {
  const app = await NestFactory.create(ExpensesModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Personal Tracking System API')
    .setDescription('API documentation for personal tracking system')
    .setVersion('1.0')
    .addTag('orders') // Bạn có thể thêm tag theo tên module
    // .addBearerAuth() // Nếu bạn dùng JWT để bảo mật
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Đường dẫn truy cập Swagger là /api
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
