/* IMPORTACIONES DE NEST */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/* IMPORTACIONES LOCALES */
import { User, UserSchema } from './models/user.model';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SavingAccountsModule } from '../savingAccounts/savingAccounts.module';

@Module({
    imports: [
        forwardRef(() => SavingAccountsModule),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [UsersService, User],
    controllers: [UsersController],
    exports: [MongooseModule]
})
export class UsersModule {}
