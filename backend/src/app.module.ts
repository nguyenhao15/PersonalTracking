import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesModule } from './modules/expenses-tracking/expenses/expenses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true, // Tự động nhận diện các Entity
      synchronize: true,
    }),
    ExpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
