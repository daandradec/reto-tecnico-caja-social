/* IMPORTACIONES DE NEST */
import { PartialType } from '@nestjs/swagger';

/* IMPORTACIONES DE CLASS VALIDATOR */
import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

/* IMPORTACION DE TIPOS */
import type { UserInterface, UserPassInterface } from '../types/user';

export class UserDTOCreate implements UserInterface, UserPassInterface {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNumberString()
    @IsString()
    @IsNotEmpty()
    cc: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UserDTOUpdate extends PartialType(UserDTOCreate) {}
