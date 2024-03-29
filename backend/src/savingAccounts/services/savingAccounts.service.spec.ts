import { Test, TestingModule } from '@nestjs/testing';
import { SavingAccountsService } from './savingAccounts.service';

describe('SavingAccountsService', () => {
    let service: SavingAccountsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SavingAccountsService]
        }).compile();

        service = module.get<SavingAccountsService>(SavingAccountsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
