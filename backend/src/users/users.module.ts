/* IMPORTACIONES DE NEST */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/* IMPORTACIONES LOCALES */
import { User, UserSchema } from './models/user.model';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SavingAccountsModule } from '../savingAccounts/savingAccounts.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        forwardRef(() => SavingAccountsModule),
        forwardRef(() => AuthModule),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [UsersService, User],
    controllers: [UsersController],
    exports: [MongooseModule, UsersService]
})
export class UsersModule {}
