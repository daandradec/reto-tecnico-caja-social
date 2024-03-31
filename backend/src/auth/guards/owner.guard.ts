import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class OwnerGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        /* OBTENER EL TOKEN JWT DE LA CABECERA */
        const ownerKeyName: string = this.reflector.get<string>(
            'owner',
            context.getHandler()
        );
        const request = context.switchToHttp().getRequest();

        /* VALIDAR LA PERTENENCIA DEL RECURSO DEL USUARIO AUTENTICADO CON EL OBJETO A CONSULTAR */
        if (!request.auth)
            throw new UnauthorizedException(`You can't edit this resource`);
        if (
            request.params.id &&
            request.params.id !== request.auth[ownerKeyName]
        )
            throw new UnauthorizedException(`You can't edit this resource`);
        return true;
    }
}
