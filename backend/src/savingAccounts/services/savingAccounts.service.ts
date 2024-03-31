/* IMPORTACIONES DE NEST */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

/* IMPORTACION DE SCHEMAS */
import { SavingAccount } from '../model/savingAccount.model';
import { QueryFiltersDTO } from '../../filters/dto/queryFilters.dto';
import { SavingAccountDTOUpdate } from '../dto/savingAccount.dto';
import { ndigits } from '../../submodules/Number/ndigits';

@Injectable()
export class SavingAccountsService {
    constructor(
        @InjectModel(SavingAccount.name)
        private savingAccountModel: Model<SavingAccount>
    ) {}

    /* OBTENER TODO EL LISTADO DE CUENTAS DE AHORROS */
    async index({ page, limit }: QueryFiltersDTO) {
        const [total, savingAccounts] = await Promise.all([
            this.savingAccountModel.countDocuments(),
            this.savingAccountModel
                .find()
                .populate('user', '-password')
                .skip(page * limit)
                .limit(limit)
                .exec()
        ]);
        return { data: savingAccounts, limit, page: page, total };
    }

    /* OBTENER 1 CUENTA DE AHORROS */
    async show(id: string) {
        const savingAccount = await this.savingAccountModel.findById(id);
        if (!savingAccount)
            throw new NotFoundException('Saving Account not found', {
                description: 'The saving account request is wrong'
            });
        await savingAccount.populate('user', '-password');
        return savingAccount;
    }

    /* CREAR UNA CUENTA DE AHORROS */
    async create(userId: Types.ObjectId) {
        const amount = await this.savingAccountModel.countDocuments();
        const savingAccount = new this.savingAccountModel({
            accountNumber: ndigits(amount + 1),
            money: 0,
            user: userId
        });
        await savingAccount.save();
        return savingAccount;
    }

    /* ACTUALIZAR LOS CAMPOS DE UNA CUENTA DE AHORROS  */
    async update(id: string, fields: SavingAccountDTOUpdate) {
        const savingAccount = this.savingAccountModel.findById(id);
        if (!savingAccount)
            throw new NotFoundException('Saving Account not found', {
                description: 'The saving account request is wrong'
            });
        return this.savingAccountModel
            .findByIdAndUpdate(id, { $set: fields }, { new: true })
            .populate('user', '-password')
            .exec();
    }

    /* ELIMINAR UNA CUENTA DE AHORROS */
    async remove(id: string) {
        const savingAccount = this.savingAccountModel.findById(id);
        if (!savingAccount)
            throw new NotFoundException('Saving Account not found', {
                description: 'The saving account request is wrong'
            });
        return await this.savingAccountModel.findByIdAndDelete(id);
    }
}
