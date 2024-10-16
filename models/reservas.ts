export class Reservas{
    id?: number
    usuario_id: number
    vehiculo_id: number
    fecha_reserva: string|number

    constructor(id:number, usuario_id:number, vehiculo_id:number, fecha_reserva:string|number){
        this.id = id
        this.usuario_id = usuario_id
        this.vehiculo_id = vehiculo_id
        this.fecha_reserva = fecha_reserva
    }
}