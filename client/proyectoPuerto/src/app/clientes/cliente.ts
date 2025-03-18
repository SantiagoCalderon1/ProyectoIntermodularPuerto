export class cliente {
    constructor(
        public nif: string = '',
        public nombre: string = '',
        public apellidos: string = '',
        public domicilio: string = '',
        public codigoPostal: string = '',
        public numeroBancario: string = '',
        public telefono: string = '',
        public email: string = ''
    ) {
    }
}