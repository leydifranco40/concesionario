import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection} from "./data";
import { Vehiculos } from "../models/vehiculos";
export class VehiculosRepository {
    async agregar(vehiculos: Vehiculos):  Promise<ResultSetHeader>{
      // Acceso a la base de datos - conexion
      const connection: Pool = getPoolConnection();
      // NOTA: Muy importante el orden de los parametros
      const querySql = `INSERT INTO vehiculos (marca, modelo, anio) VALUES (?,?,?)`;
      const values = [vehiculos.marca, vehiculos.modelo, vehiculos.anio];
      const result: [ResultSetHeader, FieldPacket[]] =await connection.query(querySql, values);
      return result[0];
    }
  
    async obtener() {
      const connection = getPoolConnection();
      const querySql = `SELECT * FROM vehiculos`;
      const result = await connection.query(querySql);
      return result[0];
    }
  
    async obtenerPorId(id: number): Promise<RowDataPacket[]> {
      const connection = getPoolConnection();
      const querySql = `SELECT * FROM vehiculos WHERE id = ?`;
      const values = [id];
      const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
      return queryResult[0];
    }
  
    async actualizar(vehiculos: Vehiculos) {
      const connection = getPoolConnection();
      const querySql = `UPDATE vehiculos SET marca = ?, modelo = ?, anio = ? WHERE id = ?`;
      const values = [vehiculos.marca, vehiculos.modelo, vehiculos.anio, vehiculos.id]
      const result = await connection.query<ResultSetHeader>(querySql, values);
      return result[0];
    };
      
  
    async eliminar(id: number):Promise<ResultSetHeader>  {
      const connection = getPoolConnection();
      const querySql = `DELETE FROM vehiculos WHERE id = ?`;
      const values = [id];
      const result: [ResultSetHeader, FieldPacket[]]= await connection.query(querySql, values);
      return result[0];
    }
  }