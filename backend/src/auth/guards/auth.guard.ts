import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AUTH_PUBLIC_KEY } from '../decorators/authpublic.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            AUTH_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        );
        /* SI ES UNA RUTA PUBLICA CONTINUE */
        if (isPublic) return true;

        /* OBTENER EL TOKEN JWT DE LA CABECERA */
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            /* DESENCRIPTAR EL TOKEN JWT Y OBTENER LA DATA */
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            });
            /* ALMACENAR EL USUARIO LOGUEADO Y VALIDADO COMO VARIABLE DEL REQUEST */
            request['auth'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
