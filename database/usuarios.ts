import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection} from "./data";
import { Usuarios } from "../models/usuarios";

export class UsuarioRepository {
    async agregarUsuario(usuarios: Usuarios):  Promise<ResultSetHeader>{
      // Acceso a la base de datos - conexion
      const connection: Pool = getPoolConnection();
      // NOTA: Muy importante el orden de los parametros
      const querySql = `INSERT INTO usuarios (nombre, email, telefono) VALUES (?,?,?)`;
      const values = [usuarios.nombre, usuarios.email, usuarios.telefono];
  
      const result = await connection.query(querySql, values);
      return result;
    }
  
    async obtenerUsuarios() {
      const connection = getPoolConnection();
      const querySql = `SELECT * FROM usuarios`;
      const result = await connection.query(querySql);
      return result;
    }
  
    async obtenerCliente(idusuarios: number): Promise<RowDataPacket[]> {
      const connection = getPoolConnection();
      const querySql = `SELECT * FROM usuarios WHERE id = ?`;
      const values = [idusuarios];
      const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
      return queryResult[0];
    }
  
    async modificarUsuarios(usuarios: Usuarios) {
      const connection = getPoolConnection();
      const querySql = `UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?`;
      const values = [
        usuarios.nombre,
        usuarios.email,
        usuarios.telefono,
        usuarios.id,
      ];
      const result = await connection.query<ResultSetHeader>(querySql, values);
      return result[0];
    }
  
    async eliminarUsuarios(idusuarios: number) {
      const connection = getPoolConnection();
      const querySql = `DELETE FROM usuarios WHERE id = ?`;
      const values = [idusuarios];
      const result = await connection.query(querySql, values);
      return result;
    }
  }