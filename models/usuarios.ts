export class Usuarios{
    id?: number
    nombre: string
    email: string
    telefono: number

    constructor(infoUsuarios:{
        id:number 
        nombre:string 
        email:string 
        telefono:number
    }){
        this.id = infoUsuarios.id
        this.nombre = infoUsuarios.nombre
        this.email = infoUsuarios.email
        this.telefono = infoUsuarios.telefono
    }
}