import {  ResultSetHeader } from "mysql2";
import { Reservas } from "../models/reservas";
import { ReservasRepository } from "../database/reservas";

export class ReservasController {
  private repository: ReservasRepository;

  constructor() {
    this.repository = new ReservasRepository();
  }
//AGREGAR
  async agregar(payload: {
    id: number
    usuario_id: number;
    vehiculo_id: number;
    fecha_reserva: string | number;
    
  }) {
    try {
      const reservas = new Reservas({
        id: payload.id,
        usuario_id: payload.usuario_id,
        vehiculo_id : payload.vehiculo_id,
        fecha_reserva :payload.fecha_reserva
        
      });
      const resultado = await this.repository.agregar(reservas);
      if (resultado.affectedRows == 1) {
        return {ok: true, id: resultado.insertId};
      } else {
        return {ok: false, message:"La Reserva no se registró"};
      }   
    } catch (error: any) {
      console.log("Ha ocurrido un error al crear la reserva.", error?.message);
      throw error;
    }
  }
//ACTUALIZAR
  async actualizar(payload: {
    id: number;
    usuarios_id: number;
    vehiculo_id: number;
    fecha_reserva: string | number
  }) {
    try {
      const reservas = new Reservas({
        id: payload.id,
        usuario_id: payload.usuarios_id,
        vehiculo_id: payload.vehiculo_id,
        fecha_reserva: payload.fecha_reserva
      });
      const resultado = await this.repository.actualizar(reservas);
      if (resultado.affectedRows === 1) {
        return {ok: true, message:"Reserva actualizada"};
      } else {
        return {ok: false, message:"No se pudo actualizar la Reserva"};
      }    
    } catch (error) {
      console.log("Ha ocurrido un error actualizando");
      throw error;
    }
  }

//OBTENER
  async obtener() {
    try {
      const resultado = await this.repository.obtener();
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultar las reservas.");
      throw error;
    }
  }
//OBTENER BY ID
  async obtenerPorId(id: number) {
    try {
      const resultado = await this.repository.obtenerPorId(id);
      if (resultado.length == 1) {
        console.log(resultado[0]);
      } else {
        return null;
      }
    } catch (error) {
      console.log("Ha ocurrido un error al consultar la reserva.");
      throw error;
    }
  }
//ELIMINAR
  async eliminar(id: number) {
    const resultado: ResultSetHeader = await this.repository.eliminar(id);
    if (resultado.affectedRows == 1) {
      return { ok: true, message: "Reserva eliminada" };
    } else {
      return { ok: false, message: "No se pudo eliminar la reserva " }


  /*eliminar(id: number) {
    this.repository
      .eliminar(id)
      .then((resultado) => {
        if (resultado.affectedRows == 1) {
          resolve({ ok: true, message: "Reserva eliminada" })
        } else {
          resolve({ ok: false, message: "No se pudo eliminar la reserva" });
        }
      })
      .catch((error) => {
        reject({ ok: false, message: "Error al eliminar la reserva" });
      });*/
  }
}
}