/* IMPORTACIONES DE NEST */
import { PartialType } from '@nestjs/swagger';

/* IMPORTACIONES DE CLASS VALIDATOR */
import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsString
} from 'class-validator';

/* IMPORTACION DE TIPOS */
import type { SavingAccountInterface } from '../types/savingAccount';

export class SavingAccountDTOCreate implements SavingAccountInterface {
    @IsNumberString()
    @IsString()
    @IsNotEmpty()
    accountNumber: string;

    @IsNumber()
    @IsNotEmpty()
    money: number;
}

export class SavingAccountDTOUpdate extends PartialType(
    SavingAccountDTOCreate
) {}
