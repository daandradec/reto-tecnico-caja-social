/* IMPORTACIONES DE NEST */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/* IMPORTACIONES LOCALES*/
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './database/filters/mongoExceptionFilter';

async function bootstrap() {
    // Inicialización de la aplicación
    const app = await NestFactory.create(AppModule);

    // Incrustación de Pipe de validación
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        })
    );

    // Configuración de Swagger para documentado de API
    const config = new DocumentBuilder()
        .setTitle('Api Nest.js Challenge Banco Caja Social por Duván Andrade')
        .setDescription(
            'Api para el manejo de la creacion de cuentas de ahorros'
        )
        .setVersion('1.0')
        .build();

    // Instanciación de Swagger para documentado de API
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.useGlobalFilters(new MongoExceptionFilter());

    // Poner el servidor a escuchar
    await app.listen(process.env.PORT);
}
bootstrap();
