import {  ResultSetHeader } from "mysql2";
import { Vehiculos } from "../models/vehiculos";
import { VehiculosRepository } from "../database/vehiculos";

export class VehiculosController {
  private repository: VehiculosRepository

  constructor() {
    this.repository = new VehiculosRepository();
  }

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
        console.log(`Vehiculo agregado con el id: ${resultado.insertId}`);
      } else {
        console.log("El vehiculo no se agrego");
      }
      return resultado;
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar.", error?.message);
      return error;
    }
  }

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
        console.log("Vehiculo actualizado");
      } else {
        console.log("No se pudo actualizar el vehiculo");
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
      console.log("Vehiculos");
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultar los vehiculos.");
      return error;
    }
  }

  async obtenerPorId(id: number) {
    try {
      const resultado = await this.repository.obtenerPorId(id);
      if (resultado.length == 1) {
        console.log("Vehiculo consultado por Id");
        console.log(resultado[0]);
      } else {
        console.log("No se encontro el vehiculo");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultar el vehiculo.");
      return error;
    }
  }

  eliminar(id: number) {
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
      });
  }
}