import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './modules/ExpensesTracking/messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
