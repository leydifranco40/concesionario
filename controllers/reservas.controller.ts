import {  ResultSetHeader } from "mysql2";
import { Reservas } from "../models/reservas";
import { ReservasRepository } from "../database/reservas";

export class ReservasController {
  private repository: ReservasRepository;

  constructor() {
    this.repository = new ReservasRepository();
  }

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
        console.log(`Reserva registrada con el id: ${resultado.insertId}`);
      } else {
        console.log("La Reserva no se registró");
      }
      return resultado;
    } catch (error: any) {
      console.log("Ha ocurrido un error al hacer la reserva.", error?.message);
      return error;
    }
  }

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
        console.log("Reserva actualizada");
      } else {
        console.log("No se pudo actualizar la Reserva");
      }
        return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error actualizando");
      return error;
    }
  }


  async obtener() {
    try {
      const resultado = await this.repository.obtener();
      console.log("Reservas");
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultar las reservas.");
      return error;
    }
  }

  async obtenerPorId(id: number) {
    try {
      const resultado = await this.repository.obtenerPorId(id);
      if (resultado.length == 1) {
        console.log("Reserva consultada");
        console.log(resultado[0]);
      } else {
        console.log("No se encontro la Reserva");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultar la reserva.");
      return error;
    }
  }

  eliminar(id: number) {
    this.repository
      .eliminar(id)
      .then((resultado: ResultSetHeader) => {
        if (resultado.affectedRows == 1) {
          console.log(`Reserva eliminada`);
        } else {
          console.log("No se pudo eliminar la reserva");
        }
      })
      .catch((error) => {
        console.log("Ha ocurrido un error eliminando.");
        console.log(error);
      });
  }
}