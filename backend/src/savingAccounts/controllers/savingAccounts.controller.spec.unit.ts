import { Test, TestingModule } from '@nestjs/testing';
import { SavingAccountsController } from './savingAccounts.controller';
import { QueryFiltersDTO } from '../../filters/dto/queryFilters.dto';

describe('SavingAccountsController', () => {
    let controller: SavingAccountsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SavingAccountsController]
        }).compile();

        controller = module.get<SavingAccountsController>(
            SavingAccountsController
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(controller.index({} as QueryFiltersDTO)).toBe([]);
        });
    });
});
