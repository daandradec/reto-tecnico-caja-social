/* GENERAR UN NUMERO ALEATORIO EN UN RANGO CON PARTICIONES EQUIDISTANTES DE MISMA PROBABILIDAD */
export function random(max: number, min: number = 0) {
    if (max) {
        return min + Math.floor(Math.random() * Math.abs(max - min + 1));
    } else return Math.random();
}

/* GENERAR UN NUMERO ALEATORIO DE N DIGITOS ALEATORIOS ENTRE 0 Y 9 QUE PUEDAN COMENZAR CON 0 O SER TODOS 0 */
export function randomNDigitsString(digits: number): string {
    let result = random(9).toString();
    for (let i = 1; i < digits; ++i) result += random(9).toString();
    return result;
}
