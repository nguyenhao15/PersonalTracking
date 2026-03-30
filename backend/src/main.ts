import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './core/exceptions/http-exception.filter';
import { AuditInterceptor } from './core/security/common/interceptors/audit.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các thuộc tính không có trong DTO
      transform: true, // Tự động chuyển đổi kiểu dữ liệu
      transformOptions: {
        enableImplicitConversion: true, // Tự động chuyển kiểu dựa trên định nghĩa trong DTO
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter()); // Thêm filter để xử lý lỗi toàn cục
  app.useGlobalInterceptors(new AuditInterceptor()); // Thêm interceptor để ghi log hoạt động
  const config = new DocumentBuilder()
    .setTitle('Personal Tracking System API')
    .setDescription('API documentation for personal tracking system')
    .setVersion('1.0')
    .addTag('orders') // Bạn có thể thêm tag theo tên module
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Đường dẫn truy cập Swagger là /api
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
