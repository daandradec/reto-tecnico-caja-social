/* IMPORTACIONES DE NEST */
import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Put,
    Get,
    Query,
    UseGuards,
    SetMetadata
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/* IMPORTACIONES LOCALES */
import { UsersService } from '../services/users.service';
import { UserDTOCreate, UserDTOUpdate } from '../dto/user.dto';
import { QueryFiltersDTO } from '../../filters/dto/queryFilters.dto';
import { MongoIdPipe } from '../../filters/pipes/mongoId/mongoId.pipe';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { OwnerGuard } from '../../auth/guards/owner.guard';
import { AuthPublic } from '../../auth/decorators/authpublic.decorator';

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Mostrar todos los usuarios' })
    @AuthPublic()
    @Get()
    index(@Query() params: QueryFiltersDTO) {
        return this.usersService.index(params);
    }

    @ApiOperation({ summary: 'Mostrar la información de un usuario' })
    @SetMetadata('owner', 'user')
    @UseGuards(OwnerGuard)
    @Get(':id')
    show(@Param('id', MongoIdPipe) id: string) {
        return this.usersService.show(id);
    }

    @ApiOperation({ summary: 'Crear usuario y cuenta de ahorros' })
    @AuthPublic()
    @Post()
    create(@Body() payload: UserDTOCreate) {
        return this.usersService.create(payload);
    }

    @ApiOperation({ summary: 'Actualizar campos del usuario' })
    @SetMetadata('owner', 'user')
    @UseGuards(OwnerGuard)
    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UserDTOUpdate
    ) {
        return this.usersService.update(id, payload);
    }

    @ApiOperation({ summary: 'Eliminar usuario y cuenta de ahorros' })
    @SetMetadata('owner', 'user')
    @UseGuards(OwnerGuard)
    @Delete(':id')
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.usersService.remove(id);
    }
}
