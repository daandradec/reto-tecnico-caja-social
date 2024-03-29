/* IMPORTACIONES DE NEST */
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/* IMPORTACIONES LOCALES */
import { EnviromentService } from '../enviroment/enviroment.service';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (ENV: EnviromentService) => {
                const {
                    DB_MONGO_CONNECTION: connection,
                    DB_MONGO_ROOT_USERNAME: user,
                    DB_MONGO_ROOT_PASSWORD: pass,
                    DB_MONGO_HOST: host,
                    DB_MONGO_PORT: port,
                    DB_MONGO_NAME: dbName
                } = ENV;

                return {
                    uri: `${connection}://${host}:${port}`,
                    user,
                    pass,
                    dbName,
                    retryAttempts: 1
                };
            },
            inject: [EnviromentService]
        })
    ],
    controllers: [],
    providers: [],
    exports: [MongooseModule]
})
export class DatabaseModule {}
