/* IMPORTACIONES DE NEST */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/* IMPORTACIONES LOCALES */
import type { Enviroment } from './enviroment';

@Injectable()
export class EnviromentService {
    constructor(private configService: ConfigService<Enviroment>) {}

    get JWT_SECRET(): string {
        return this.configService.get<string>('JWT_SECRET', {
            infer: true
        })!;
    }

    get JWT_EXPIRES_SECONDS(): string {
        return this.configService.get<number>('JWT_EXPIRES_SECONDS', {
            infer: true
        })!;
    }

    get DB_MONGO_ROOT_USERNAME(): string {
        return this.configService.get<string>('DB_MONGO_ROOT_USERNAME', {
            infer: true
        })!;
    }

    get DB_MONGO_ROOT_PASSWORD(): string {
        return this.configService.get<string>('DB_MONGO_ROOT_PASSWORD', {
            infer: true
        })!;
    }

    get DB_MONGO_NAME(): string {
        return this.configService.get<string>('DB_MONGO_NAME', {
            infer: true
        })!;
    }

    get DB_MONGO_PORT(): string {
        return this.configService.get<string>('DB_MONGO_PORT', {
            infer: true
        })!;
    }

    get DB_MONGO_HOST(): string {
        return this.configService.get<string>('DB_MONGO_HOST', {
            infer: true
        })!;
    }

    get DB_MONGO_CONNECTION(): string {
        return this.configService.get<string>('DB_MONGO_CONNECTION', {
            infer: true
        })!;
    }
}
