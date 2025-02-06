export class Instalacion{
            constructor (
                public id_instalacion: number,
                public codigo:string,
                public descripcion: string,
                public fecha_disposicion:string,
                public tipo_instalacion: string,
                public estado:number,
                public puerto:string
            ){}

}