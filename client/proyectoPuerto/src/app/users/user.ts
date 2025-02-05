export class User {
    constructor(
        public usuario: string,
        public nombre: string,
        public email: string,
        public idioma: string,
        public habilitado: number = 0,
        public rol: number = 0
    ) { }
}