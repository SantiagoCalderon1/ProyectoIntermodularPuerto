export class Recibo {
    constructor(
        public num_factura: number,
        public fecha_emision: Date,
        public devuelto: number
    ) {}
}