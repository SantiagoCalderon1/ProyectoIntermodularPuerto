export class Tripulante {
    constructor(
        public tipoDocumento: string = '',
        public numeroDocumento: string = '',
        public nombre: string = '',
        public apellidos: string = '',
        public nacionalidad: string = '',
        public genero: number = 0,
        public fechaNacimiento: Date,
        public paisNacimiento: string = '',
        public lugarNacimiento: string = '',
        public fechaExpeDocumento: Date,
        public fechaCadDocumento: Date
    ) { }
}