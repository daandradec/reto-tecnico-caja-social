/* IMPORTACIONES DE NEST */
import { validate } from './enviroment.model';
import type { ConfigModuleOptions } from '@nestjs/config';

/* DEFINICIÓN DE TIPOS */
enum NodeEnv {
    'development' = '.env',
    'production' = '.env.prod',
    'test' = '.env.test'
}

/* EXPORTACIÓN DEL OBJETO DE CONFIGURACIÓN DE VARIABLES DE ENTORNO */
export const ConfigEnviroment: ConfigModuleOptions = {
    envFilePath: NodeEnv[process.env.NODE_ENV],
    isGlobal: true,
    load: [
        () => ({
            PORT: parseInt(process.env.PORT) || 3000,
            JWT_EXPIRES_SECONDS:
                parseInt(process.env.JWT_EXPIRES_SECONDS) || 3600
        })
    ],
    validate,
    validationOptions: {
        allowUnknown: false,
        abortEarly: true
    }
};
