export interface Enviroment {
    PORT: number;
    JWT_SECRET: string;
    JWT_EXPIRES_SECONDS: number;

    DB_MONGO_ROOT_USERNAME: string;
    DB_MONGO_ROOT_PASSWORD: string;
    DB_MONGO_NAME: string;
    DB_MONGO_PORT: string;
    DB_MONGO_HOST: string;
    DB_MONGO_CONNECTION: string;
}
