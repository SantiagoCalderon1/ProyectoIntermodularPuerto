export class Instalacion{
    /**   <th>ID:</th>
            <th>Código:</th>
            <th>Descripción:</th>
            <th>Fecha de disposición:</th>
            <th>Estado:</th>
            <th>Puerto:</th> */
            constructor (
                public id_instalacion: number,
                public codigo:string,
                public descripcion: string,
                public fecha_disposicion:string,
                public estado:number,
                public puerto:string
            ){}

}