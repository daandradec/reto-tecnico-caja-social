/* IMPORTACIONES DE NEST */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

/* IMPORTACIONES LOCALES */
import { User } from '../models/user.model';
import { UserDTOCreate, UserDTOUpdate } from '../dto/user.dto';
import { QueryFiltersDTO } from '../../filters/dto/queryFilters.dto';
import { SavingAccountsService } from '../../savingAccounts/services/savingAccounts.service';
import { Hash } from '../../submodules/Hash/Hash';

@Injectable()
export class UsersService {
    constructor(
        private savingAccountsService: SavingAccountsService,
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {}

    /* OBTENER TODO EL LISTADO DE USUARIOS */
    async index({ page, limit }: QueryFiltersDTO) {
        const [total, users] = await Promise.all([
            this.userModel.countDocuments(),
            this.userModel
                .find()
                .select('-password')
                .populate('savingAccount')
                .skip(page * limit)
                .limit(limit)
                .exec()
        ]);
        return { data: users, limit, page, total };
    }

    /* OBTENER 1 USUARIO */
    async show(id: string) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new NotFoundException('User not found', {
                description: 'The user request is wrong'
            });
        await user.populate('savingAccount');
        user.$set('password', undefined, { strict: false });
        return user;
    }

    /* OBTENER 1 USUARIO POR CAMPO */
    async find(email: string) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new NotFoundException('User not found', {
                description: 'The user request is wrong'
            });
        await user.populate('savingAccount');
        return user;
    }

    /* CREAR UN USUARIO Y SU CUENTA DE AHORROS */
    async create(fields: UserDTOCreate) {
        const user = await this.userModel.create({
            ...fields,
            password: Hash.hash(fields.password)
        });
        const savingAccount = await this.savingAccountsService.create(user._id);
        user.savingAccount = savingAccount;
        await user.save();
        user.$set('password', undefined, { strict: false });
        return user;
    }

    /* ACTUALIZAR LOS CAMPOS DE UN USUARIO */
    async update(id: string, fields: UserDTOUpdate) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new NotFoundException('User not found', {
                description: 'The user request is wrong'
            });
        return this.userModel
            .findByIdAndUpdate(id, { $set: fields }, { new: true })
            .select('-password')
            .populate('savingAccount')
            .exec();
    }

    /* ELIMINAR UN USUARIO Y SU CUENTA DE AHORROS */
    async remove(id: string) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new NotFoundException('User not found', {
                description: 'The user request is wrong'
            });
        await this.savingAccountsService.remove(user.savingAccount.toString());
        return await user.deleteOne();
    }
}
