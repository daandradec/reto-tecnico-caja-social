/* IMPORTACIONES DE NEST */
import { Global, Module } from '@nestjs/common';

/* IMPORTACIONES LOCALES */
import { EnviromentService } from './enviroment.service';

/* CREACIÓN DEL MODULO */
@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [EnviromentService],
    exports: [EnviromentService]
})
export class EnviromentModule {}
