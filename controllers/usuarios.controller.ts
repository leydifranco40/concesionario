import {  ResultSetHeader } from "mysql2";
import { Usuarios } from "../models/usuarios";
import { UsuarioRepository } from "../database/usuarios"; 


export class UsuariosController {
  private repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }
// AGREGAR
  async agregar(payload: {
    id: number;
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
        return {ok: true, id: resultado.insertId};
      } else {
        return {ok: false, message:"El usuario no se registró"};
      }     
    } catch (error: any) {
      console.log("Ha ocurrido un error al registrar el usuario.", error?.message);
      throw new Error(`Error al registrar el usuario: ${error.message}`);
    }
  }

  
//ACTUALIZAR
  async actualizar(payload: {
    id: number;
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
        return {ok: true, message:"Usuario actualizado"};
      } else {
        return {ok: false, message:"No se pudo actualizarel usuario"};
      }     
    } catch (error:any) {
      console.log("Ha ocurrido un error actualizando");
      throw new Error(`Error al actualizar el usuario: ${error.message}`)
    }
  }

//OBTENER
  async obtener() {
    try {
      const resultado = await this.repository.obtener();
      console.log("Usuarios");
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultar los usuarios.");
      throw error;
    }
  }
//OBTENER BY ID
  async obtenerPorId(id:number) {
    try {
      const resultado = await this.repository.obtenerPorId(id);
      if (resultado.length == 1) {
        console.log(resultado[0]);
      } else {
        return null
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultar el usuario.");
      return error;
    }
  }

  //ELIMINAR
  async eliminar(id: number) {
    const resultado: ResultSetHeader = await this.repository.eliminar(id);
    if (resultado.affectedRows == 1) {
      return { ok: true, message: "Usuario eliminado" };
    } else {
      return { ok: false, message: "No se pudo eliminar el usuario" }

  /*eliminar(id: number) {
    this.repository
      .eliminar(id)
      .then((resultado: ResultSetHeader) => {
        if (resultado.affectedRows == 1) {
          resolve({ok: true, message: "Reserva eliminada"})
        } else {
          resolve({ok: false, message: "No se pudo eliminar el usuario"});
        }
      })
      .catch((error) => {
         reject({ ok: false, message: "Error al eliminar el usuario" });
      });*/
  }
}
}