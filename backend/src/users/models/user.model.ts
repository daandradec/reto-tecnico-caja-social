/* IMPORTACIONES DE NEST */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

/* IMPORTACION DE TIPOS */
import type { UserInterface, UserPassInterface } from '../types/user';

/* IMPORTACIONES LOCALES */
import { SavingAccount } from '../../savingAccounts/model/savingAccount.model';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User implements UserInterface, UserPassInterface {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    cc: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: Types.ObjectId, ref: SavingAccount.name })
    savingAccount: SavingAccount | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
