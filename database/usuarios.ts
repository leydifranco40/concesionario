import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection} from "./data";
import { Usuarios } from "../models/usuarios";

export class UsuarioRepository {
    async agregar(usuarios: Usuarios):  Promise<ResultSetHeader>{
      // Acceso a la base de datos - conexion
      const connection: Pool = getPoolConnection();
      // NOTA: Muy importante el orden de los parametros
      const querySql = `INSERT INTO usuarios (nombre, email, telefono) VALUES (?,?,?)`;
      const values = [usuarios.nombre, usuarios.email, usuarios.telefono];
      const result: [ResultSetHeader, FieldPacket[]] =await connection.query(querySql, values);
      return result[0];
    }
  
    async obtener() {
      const connection = getPoolConnection();
      const querySql = `SELECT * FROM usuarios`;
      const result = await connection.query(querySql);
      return result[0];
    }
  
    async obtenerPorId(id: number): Promise<RowDataPacket[]> {
      const connection = getPoolConnection();
      const querySql = `SELECT * FROM usuarios WHERE id = ?`;
      const values = [id];
      const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
      return queryResult[0];
    }
  
    async actualizar(usuarios: Usuarios) {
      const connection = getPoolConnection();
      const querySql = `UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?`;
      const values = [usuarios.nombre, usuarios.email, usuarios.telefono, usuarios.id,];
      const result = await connection.query<ResultSetHeader>(querySql, values);
      return result[0];
    }
  
    async eliminar(id: number): Promise<ResultSetHeader> {
      const connection = getPoolConnection();
      const querySql = `DELETE FROM usuarios WHERE id = ?`;
      const values = [id];
      const result : [ResultSetHeader, FieldPacket[]]= await connection.query(querySql, values);
      return result[0];
    }
  }