/* IMPORTACIONES DE NEST */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/* IMPORTACIONES LOCALES */
import { SavingAccountsController } from './controllers/savingAccounts.controller';
import {
    SavingAccount,
    SavingAccountSchema
} from './model/savingAccountExtended.model';
import { SavingAccountsService } from './services/savingAccounts.service';
import { UsersModule } from '../users/users.module';

/* CREACIÓN DEL MODULO */
@Module({
    imports: [
        forwardRef(() => UsersModule),
        MongooseModule.forFeature([
            { name: SavingAccount.name, schema: SavingAccountSchema }
        ])
    ],
    controllers: [SavingAccountsController],
    providers: [SavingAccountsService, SavingAccount],
    exports: [MongooseModule, SavingAccountsService]
})
export class SavingAccountsModule {}
