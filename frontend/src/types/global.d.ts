export interface SavingAccountBase {
    _id: string;
    accountNumber: string;
    money: number;    
}

export interface UserBase {
    _id: string;
    name: string;
    email: string;
    cc: string;
    password: string;    
}

export interface User extends UserBase{
    savingAccount: SavingAccountBase;
}

export interface SavingAccount extends SavingAccountBase {
    user: UserBase;
}