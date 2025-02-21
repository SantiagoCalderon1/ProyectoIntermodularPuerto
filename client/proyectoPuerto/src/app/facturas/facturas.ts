export class Factura {
    constructor(
        public num_factura: string,
        public nif_cliente: string,
        public id_reserva: number,
        public fecha_expedicion: string, // Formato: YYYY-MM-DD
        public fecha_vencimiento: string, // Formato: YYYY-MM-DD
        public base_imponible: number,
        public dias: number,
        public precio_unitario: number,
        public tipo_iva: number,
        public tipo_irpf: number,
        public total: number,
        public cobrada: number,
    ) { }
}

export class Cliente {
    constructor(
        public nif: string,
        public nombre: string,
        public apellidos: string,
        public domicilio: string,
        public codigoPostal: string,
        public numeroBancario: string,
        public telefono: string,
        public email: string
    ) { }
}

export class Reserva {
    constructor(
        public id_reserva: number,
        public plaza: number,
        public titular: string,
        public embarcacion: string,
        public fecha_ini: string, // Formato: YYYY-MM-DD
        public fecha_fin: string // Formato: YYYY-MM-DD
    ) { }
}
