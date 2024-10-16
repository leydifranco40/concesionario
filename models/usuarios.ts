export class Usuarios{
    id?: number
    nombre: string
    email: string
    telefono: number

    constructor(id:number, nombre:string, email:string, telefono:number){
        this.id = id
        this.nombre = nombre
        this.email = email
        this.telefono = telefono
    }
}