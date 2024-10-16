export class Usuarios{
    id?: number
    marca: string
    modelo: string
    anio: number

    constructor(id:number, marca:string, modelo:string, anio:number){
        this.id = id
        this.marca = marca
        this.modelo = modelo
        this.anio = anio
    }
}