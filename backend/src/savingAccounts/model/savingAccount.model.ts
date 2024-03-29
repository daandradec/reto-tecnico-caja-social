/* IMPORTACIONES DE NEST */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/* IMPORTACION DE TIPOS */
import type { SavingAccountInterface } from '../types/savingAccount';

export type SavingAccountDocument = HydratedDocument<SavingAccount>;

@Schema({ versionKey: false })
export class SavingAccount implements SavingAccountInterface {
    @Prop({ type: String, required: true })
    accountNumber: string;

    @Prop({ type: Number, required: true })
    money: number;
}

export const SavingAccountSchema = SchemaFactory.createForClass(SavingAccount);
