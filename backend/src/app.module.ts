import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExpensesModule } from './modules/expenses-tracking/expenses/expenses.module';

import { CategoriesModule } from './modules/expenses-tracking/categories/categories.module';
import { IncomeModule } from './modules/expenses-tracking/income/income.module';
import { TransferModule } from './modules/expenses-tracking/transfer/transfer.module';
import { WalletModule } from './modules/expenses-tracking/wallet/wallet.module';
import { DebtModule } from './modules/expenses-tracking/debt/debt.module';
import { InvestmentModule } from './modules/expenses-tracking/investment/investment.module';
import { InvestmentTransactionsModule } from './modules/expenses-tracking/investment-transactions/investment-transactions.module';
import { DebtTrasactionsModule } from './modules/expenses-tracking/debt-trasactions/debt-trasactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true, // Tự động nhận diện các Entity
        synchronize: true,
      }),
    }),
    ExpensesModule,
    CategoriesModule,
    IncomeModule,
    TransferModule,
    WalletModule,
    DebtModule,
    InvestmentModule,
    InvestmentTransactionsModule,
    DebtTrasactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
