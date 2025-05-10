export class Recibo {
    constructor(
        public id_recibo: number,
        public n_factura: number,
        public fecha_emision: Date,
        public devuelto: number
    ) {}
}