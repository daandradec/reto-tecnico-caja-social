/* IMPORTACIONES DE NEST */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/* IMPORTACIONES LOCALES */
import { UsersService } from '../../users/services/users.service';
import { UserDTOCreate } from '../../users/dto/user.dto';
import { Hash } from '../../submodules/Hash/Hash';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    /* GENERAR UN JWT SI COINCIDEN LAS CONTRASEÑAS PARA LOGEAR STATELESS */
    async login(email: string, password: string): Promise<any> {
        const user = await this.usersService.find(email);

        /* SI EL PASSWORD EN BD CONCUERDA CON EL PLANO HASHEADO */
        if (!(await Hash.compareHash(password, user.password)))
            throw new UnauthorizedException();

        return {
            user,
            access_token: await this.jwtService.signAsync({
                id: user._id,
                _id: user.id
            })
        };
    }

    /* REGISTRAR AL USUARIO EN EL SISTEMA Y GENERAR UN JWT TOKEN */
    async register(fields: UserDTOCreate) {
        const user = await this.usersService.create(fields);
        return {
            user,
            access_token: await this.jwtService.signAsync({
                id: user._id,
                _id: user.id
            })
        };
    }
}
