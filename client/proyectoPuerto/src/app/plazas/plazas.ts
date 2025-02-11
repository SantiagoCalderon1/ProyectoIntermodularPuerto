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
    public fecha_inicio: string /* fecha */,
    public fecha_fin: string /* fecha */,
    public titular: Titular,
    public embarcacion: Embarcacion,) { }
}

export class Titular {
    constructor(
        public id_titular: number,
        public nombre: string,
        public apellidos: string,
        public tipo_doc: string,
        public numero_doc: number,
        public letra: string,
        public tipo_via: string,
        public direccion: string,
        public numero: number,
        public cod_postal: number,
        public pais: string,
        public provincia: string,
        public poblacion: string,
        public localidad: string,
        public email: string,
        public piso: number,
        public puerta: number,
        public escalera?: string, // Puede ser NULL, así que es opcional
    ) { }
}


export class Embarcacion {
    constructor(
        public id_embarcacion: number,
        public nombre: string,
        public eslora: number,
        public manga: number,
        public calado: number,
        public matricula: string,
        public nib: string,
        public cin_hin: string,
        public titular: number // Relación con la tabla `titular`
    ) { }
}
