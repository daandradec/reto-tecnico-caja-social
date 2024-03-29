/* IMPORTACIONES DE NEST */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

/* IMPORTACIONES LOCALES */
import { User } from '../../users/models/user.model';
import { SavingAccount as SavingAccountBase } from './savingAccount.model';

@Schema({ versionKey: false })
export class SavingAccount extends SavingAccountBase {
    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User | Types.ObjectId;
}

export const SavingAccountSchema = SchemaFactory.createForClass(SavingAccount);
