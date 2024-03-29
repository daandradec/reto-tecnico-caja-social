/* IMPORTACIONES DE NEST */
import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/* IMPORTACIONES LOCALES */
import { ConfigEnviroment } from './enviroment/enviroment.config';
import { EnviromentModule } from './enviroment/enviroment.module';
import { SavingAccountsModule } from './savingAccounts/savingAccounts.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { SavingAccountsService } from './savingAccounts/services/savingAccounts.service';
import { PaginationMiddleware } from './filters/middlewares/pagination/pagination.middleware';

/* CREACIÓN DEL MODULO */
@Module({
    imports: [
        ConfigModule.forRoot(ConfigEnviroment),
        EnviromentModule,
        DatabaseModule,
        SavingAccountsModule,
        UsersModule
    ],
    controllers: [],
    providers: [SavingAccountsService]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(PaginationMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.GET });
    }
}
