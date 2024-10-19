export class Reservas{
    id?: number;
    usuario_id: number;
    vehiculo_id: number;
    fecha_reserva: Date

    constructor(infoReservas:{
        id:number;
        usuario_id:number;
        vehiculo_id:number;
        fecha_reserva:Date;
    }){
        this.id = infoReservas.id;
        this.usuario_id = infoReservas.usuario_id;
        this.vehiculo_id = infoReservas.vehiculo_id;
        this.fecha_reserva = infoReservas.fecha_reserva;
    }
}