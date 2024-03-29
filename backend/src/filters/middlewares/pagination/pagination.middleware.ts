/* IMPORTACIONES DE NEST */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
    /* AGREGAR PARAMETRO OFFSET SI NO EXISTE EN LOS QUERY PARAMS Y EXISTE EL PAGE */
    use(req: Request, res: Response, next: NextFunction) {
        if (!req.query['page'])
            req.query['page'] = req.query['offset'] ? req.query['offset'] : '0';
        if (!req.query['limit']) req.query['limit'] = '20';
        next();
    }
}
