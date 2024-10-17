export class Vehiculos{
    id?: number
    marca: string
    modelo: string
    anio: number

    constructor(infoVehiculos:{
        id:number
         marca:string 
         modelo:string
         anio:number
    }){
        this.id = infoVehiculos.id
        this.marca = infoVehiculos.marca
        this.modelo = infoVehiculos.modelo
        this.anio = infoVehiculos.anio
    }
}