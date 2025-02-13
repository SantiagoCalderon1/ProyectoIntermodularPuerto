export class Plaza {
    constructor(
    public id: number,
    public año: number,
    public puerto: string,
    public instalacion: string,
    public fecha_inicio: string /* fecha */,
    public datos_titular: string,
    public datos_embarcacion: string,
    public datos_estancia: string,) { }
}