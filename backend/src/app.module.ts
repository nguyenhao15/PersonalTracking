import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionsModule } from './modules/expenses-tracking/transactions/transactions.module';

import { CategoriesModule } from './modules/expenses-tracking/categories/categories.module';

import { TransferModule } from './modules/expenses-tracking/transfer/transfer.module';
import { WalletModule } from './modules/expenses-tracking/wallet/wallet.module';
import { DebtModule } from './modules/expenses-tracking/debt/debt.module';
import { InvestmentModule } from './modules/expenses-tracking/investment/investment.module';
import { InvestmentTransactionsModule } from './modules/expenses-tracking/investment-transactions/investment-transactions.module';
import { DebtTrasactionsModule } from './modules/expenses-tracking/debt-trasactions/debt-trasactions.module';
import { UserModule } from './core/security/user/user.module';
import { AuthModule } from './core/security/auth/auth.module';
import { AuditSubscriber } from './core/security/common/subscribers/audit.subscriber';
import { DashboardModule } from './modules/expenses-tracking/dashboard/dashboard.module';

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
    TransactionsModule,

    CategoriesModule,

    TransferModule,
    WalletModule,
    DebtModule,
    InvestmentModule,
    InvestmentTransactionsModule,
    DebtTrasactionsModule,
    UserModule,
    AuthModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuditSubscriber],
})
export class AppModule {}
