export class Plaza {
    constructor(
    public id_plaza_base: number,
    public nombre: string,
    public instalacion: string,) { }
}

export class Reserva {
    constructor(
    public id_reserva: number,
    public plaza: number,
    public fecha_ini: string /* fecha */,
    public fecha_fin: string /* fecha */,
    public titular: number,
    public embarcacion: number,) { }
}
