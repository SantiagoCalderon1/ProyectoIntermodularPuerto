export class Plaza {
    constructor(
    public id: number,
    public año: number,
    public puerto: string,
    public instalacion: number,
    public fecha_inicio: number /* fecha */,
    public datos_titular: string,
    public datos_embarcacion: string,
    public datos_estancia: string,) { }
}