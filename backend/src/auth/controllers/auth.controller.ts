/* IMPORTACIONES DE NEST */
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

/* IMPORTACIONES LOCALES */
import { AuthService } from '../services/auth.service';
import { UserDTOCreate } from '../../users/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() body: Record<string, any>) {
        return this.authService.login(body.email, body.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() body: UserDTOCreate) {
        return this.authService.register(body);
    }
}
