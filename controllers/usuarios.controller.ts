import {  ResultSetHeader } from "mysql2";
import { Usuarios } from "../models/usuarios";
import { UsuarioRepository } from "../database/usuarios"; 
import { userInfo } from "os";

export class UsuariosController {
  private repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  async agregar(payload: {
    id: number
    nombre: string;
    email: string;
    telefono: number;
  }) {
    try {
      const usuarios = new Usuarios({
        id: payload.id,
        nombre: payload.nombre,
        email: payload.email,
        telefono: payload.telefono,
      });
      const resultado = await this.repository.agregar(usuarios);
      if (resultado.affectedRows == 1) {
        console.log(`Usuario agregado con el id: ${resultado.insertId}`);
      } else {
        console.log("El usuario no se agrego");
      }
      return resultado;
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar.", error?.message);
      return error;
    }
  }

  async actualizar(payload: {
    id: number
    nombre: string;
    email: string;
    telefono: number;
  }) {
    try {
        const usuarios = new Usuarios({
            id: payload.id,
            nombre: payload.nombre,
            email: payload.email,
            telefono: payload.telefono,
      });
      const resultado = await this.repository.actualizar(usuarios);
      if (resultado.affectedRows === 1) {
        console.log("Usuario actualizado");
      } else {
        console.log("No se pudo actualizar el usuario");
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
      console.log("Usuarios");
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultar los usuarios.");
      return error;
    }
  }

  async obtenerPorId(id:number) {
    try {
      const resultado = await this.repository.obtenerPorId(id);
      if (resultado.length == 1) {
        console.log("Usuario consultado");
        console.log(resultado[0]);
      } else {
        console.log("No se encontro el usuario");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al cnsultar el usuario.");
      return error;
    }
  }

  eliminar(id: number) {
    this.repository
      .eliminar(id)
      .then((resultado: ResultSetHeader) => {
        if (resultado.affectedRows == 1) {
          console.log(`Usuario eliminado`);
        } else {
          console.log("No se pudo eliminar el usuario");
        }
      })
      .catch((error) => {
        console.log("Ha ocurrido un error eliminando.");
        console.log(error);
      });
  }
}