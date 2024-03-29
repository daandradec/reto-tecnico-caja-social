/* IMPORTACIONES DE NEST */
import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Put,
    Get,
    Query
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/* IMPORTACIONES LOCALES */
import { UsersService } from '../services/users.service';
import { UserDTOCreate, UserDTOUpdate } from '../dto/user.dto';
import { QueryFiltersDTO } from '../../filters/dto/queryFilters.dto';
import { MongoIdPipe } from '../../filters/pipes/mongoId/mongoId.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Mostrar todos los usuarios' })
    @Get()
    index(@Query() params: QueryFiltersDTO) {
        return this.usersService.index(params);
    }

    @ApiOperation({ summary: 'Mostrar la información de un usuario' })
    @Get(':id')
    show(@Param('id', MongoIdPipe) id: string) {
        return this.usersService.show(id);
    }

    @ApiOperation({ summary: 'Crear usuario y cuenta de ahorros' })
    @Post()
    create(@Body() payload: UserDTOCreate) {
        return this.usersService.create(payload);
    }

    @ApiOperation({ summary: 'Actualizar campos del usuario' })
    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UserDTOUpdate
    ) {
        return this.usersService.update(id, payload);
    }

    @ApiOperation({ summary: 'Eliminar usuario y cuenta de ahorros' })
    @Delete(':id')
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.usersService.remove(id);
    }
}
