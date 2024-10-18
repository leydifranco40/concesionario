import {  ResultSetHeader } from "mysql2";
import { Vehiculos } from "../models/vehiculos";
import { VehiculosRepository } from "../database/vehiculos";

export class VehiculosController {
  private repository: VehiculosRepository

  constructor() {
    this.repository = new VehiculosRepository();
  }
//AGREGAR
  async agregar(payload: {

    id: number;
    marca: string
    modelo: string
    anio: number
  }) {
    try {
      const vehiculos = new Vehiculos({
        id: payload.id,
        marca: payload.marca,
        modelo: payload.modelo,
        anio: payload.anio
      });
      const resultado = await this.repository.agregar(vehiculos);
      if (resultado.affectedRows == 1) {
        return {ok:true, id: resultado.insertId};
      } else {
        return {ok:false, message: "El vehiculo no se registro"};
      }
    } catch (error: any) {
      console.log("Ha ocurrido un error al crear el vehiculo.", error?.message);
      throw error;
    }
  }
//ACTUALIZAR
  async actualizar(payload: {
    id: number;
    marca: string
    modelo: string
    anio: number
  }) {
    try {
      const vehiculos = new Vehiculos({
        id: payload.id,
        marca: payload.marca,
        modelo: payload.modelo,
        anio: payload.anio
      });
      const resultado = await this.repository.actualizar(vehiculos);
      if (resultado.affectedRows === 1) {
        return {ok: true, message:"Vehiculo actualizado"};
      } else {
        return {ok: false, message:"No se pudo actualizar el Vehiculo"};
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
      console.log("Ha ocurrido un error al consultar los vehiculos.");
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
        return null
      }
    } catch (error) {
      console.log("Ha ocurrido un error al consultar el vehiculo.");
      throw error;
    }
  }

//ELIMINAR
  async eliminar(id: number) {
    const resultado: ResultSetHeader = await this.repository.eliminar(id);
    if (resultado.affectedRows == 1) {
      return { ok: true, message: "Vehiculo eliminado" };
    } else {
      return { ok: false, message: "No se pudo eliminar el vehiculo" }

  /*eliminar(id: number) {
    this.repository
      .eliminar(id)
      .then((resultado: ResultSetHeader) => {
        if (resultado.affectedRows == 1) {
          console.log(`Vehiculo eliminado`);
        } else {
          console.log("No se pudo eliminar el vehiculo");
        }
      })
      .catch((error) => {
        console.log("Ha ocurrido un error eliminando.");
        console.log(error);
      });*/
  }
}
}