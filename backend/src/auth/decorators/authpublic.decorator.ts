/* IMPORTACIONES DE NEST */
import { SetMetadata } from '@nestjs/common';

/* CREACIÓN DE UN DECORADOR */
export const AUTH_PUBLIC_KEY = 'isPublic';
export const AuthPublic = () => SetMetadata(AUTH_PUBLIC_KEY, true);
