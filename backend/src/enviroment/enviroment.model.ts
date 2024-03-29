/* IMPORTACIONES DE CLASS VALIDATOR */
import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';

/* CLASE SCHEMA PARA VALIDACIÓN DE ENVIROMENTS VARS */
export class Environment {
    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;

    @IsString()
    JWT_SECRET: string;

    @IsNumber()
    @Min(0)
    JWT_EXPIRES_SECONDS: number;

    @IsString()
    DB_MONGO_ROOT_USERNAME: string;

    @IsString()
    DB_MONGO_ROOT_PASSWORD: string;

    @IsString()
    DB_MONGO_NAME: string;

    @IsString()
    DB_MONGO_PORT: string;

    @IsString()
    DB_MONGO_HOST: string;

    @IsString()
    DB_MONGO_CONNECTION: string;
}

/* FUNCIÓN DE VALIDACIÓN PARA EL MODULO DE CONFIGURACIÓN DE NEST */
export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(Environment, config, {
        enableImplicitConversion: true
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
