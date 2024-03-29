/* GENERAR UN NUMERO ALARGADO APARTIR DE UN NUMERO N, por ejemplo 12 seria 0000012 */
export function ndigits(n: number): string {
    let s = '';
    for (let i = 0; i < 11 - n.toString().length; ++i) {
        s += '0';
    }
    return s + n.toString();
}
