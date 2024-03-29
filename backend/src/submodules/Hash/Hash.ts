/* IMPORTACIÓN DE PAQUETES */
import * as bcrypt from 'bcryptjs';

export class Hash {
    /* APLICAR UN HASHING A UN STRING EN TEXTO PLANO PARA PROTEGERLO DE ROBO POR IRRECONOCIBILIDAD */
    static hash = (string: string, complexity: number = 10) => {
        const salt = bcrypt.genSaltSync(complexity);
        return bcrypt.hashSync(string, salt);
    };

    /* COMPARAR UN STRING EN TEXTO PLANO CON SU VERSION HASHEADA */
    static compareHash = (
        plainString: string,
        receivedHashedString: string
    ): Promise<boolean> => {
        return bcrypt.compare(plainString, receivedHashedString);
    };
}
