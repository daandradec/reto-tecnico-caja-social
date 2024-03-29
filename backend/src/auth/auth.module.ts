/* IMPORTACIONES DE NEST */
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

/* IMPORTACIONES LOCALES */
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.registerAsync({
            useFactory: async () => ({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: Number(process.env.JWT_EXPIRES_SECONDS)
                }
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
