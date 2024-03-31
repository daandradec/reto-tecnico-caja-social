/* IMPORTACIONES DE NEST */
import {
    Body,
    Controller,
    Get,
    Param,
    Put,
    Query,
    SetMetadata,
    UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/* IMPORTACIONES LOCALES */
import { SavingAccountDTOUpdate } from '../dto/savingAccount.dto';
import { QueryFiltersDTO } from '../../filters/dto/queryFilters.dto';
import { SavingAccountsService } from '../services/savingAccounts.service';
import { MongoIdPipe } from '../../filters/pipes/mongoId/mongoId.pipe';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { OwnerGuard } from '../../auth/guards/owner.guard';
import { AuthPublic } from '../../auth/decorators/authpublic.decorator';

@ApiTags('Saving Account')
@UseGuards(AuthGuard)
@Controller('saving-account')
export class SavingAccountsController {
    constructor(private savingAccountsService: SavingAccountsService) {}

    @ApiOperation({ summary: 'Mostrar todos las cuentas de ahorros' })
    @AuthPublic()
    @Get()
    index(@Query() params: QueryFiltersDTO) {
        return this.savingAccountsService.index(params);
    }

    @ApiOperation({
        summary: 'Mostrar la información de una cuenta de ahorros'
    })
    @SetMetadata('owner', 'savingaccount')
    @UseGuards(OwnerGuard)
    @Get(':id')
    show(@Param('id', MongoIdPipe) id: string) {
        return this.savingAccountsService.show(id);
    }

    @ApiOperation({ summary: 'Actualizar campos de la cuenta de ahorros' })
    @SetMetadata('owner', 'savingaccount')
    @UseGuards(OwnerGuard)
    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: SavingAccountDTOUpdate
    ) {
        return this.savingAccountsService.update(id, payload);
    }
}
