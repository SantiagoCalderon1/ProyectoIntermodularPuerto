export class Transito{
    constructor(
        public anyo: number = 0,
        public pantalan: number = 0,
        public instalacion: string = "",
        public fecha_entrada: Date,
        public fecha_salida: Date,
        public patron: string = "",
        public embarcacion: number = 0,
        public datos_estancia: string = ""
    ){}
}