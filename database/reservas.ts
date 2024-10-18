import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection} from "./data";
import { Reservas } from "../models/reservas";

export class ReservasRepository {
    async agregar(reservas: Reservas):  Promise<ResultSetHeader>{
      // Acceso a la base de datos - conexion
      const connection: Pool = getPoolConnection();
      // NOTA: Muy importante el orden de los parametros
      const querySql = `INSERT INTO reservas (usuario_id, vehiculo_id, fecha_reserva) VALUES (?,?,?)`;
      const values = [reservas.usuario_id, reservas.vehiculo_id, reservas.fecha_reserva];
      const result: [ResultSetHeader, FieldPacket[]] =await connection.query(querySql, values);
      return result[0];
    }
  
    async obtener() {
      const connection = getPoolConnection();
      const querySql = `SELECT * FROM reservas`;
      const result = await connection.query(querySql);
      return result[0];
    }
  
    async obtenerPorId(id: number): Promise<RowDataPacket[]> {
      const connection = getPoolConnection();
      const querySql = `SELECT * FROM reservas WHERE id = ?`;
      const values = [id];
      const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
      return queryResult[0];
    }
  
    async actualizar(reservas: Reservas) {
      const connection = getPoolConnection();
      const querySql = `UPDATE reservas SET usuario_id = ?, vehiculo_id = ?, fecha_reserva = ? WHERE id = ?`;
      const values = [reservas.usuario_id, reservas.vehiculo_id, reservas.fecha_reserva]
      const result = await connection.query<ResultSetHeader>(querySql, values);
      return result[0];
    };
      
  
    async eliminar(id: number):Promise<ResultSetHeader>  {
      const connection = getPoolConnection();
      const querySql = `DELETE FROM reservas WHERE id = ?`;
      const values = [id];
      const result: [ResultSetHeader, FieldPacket[]]= await connection.query(querySql, values);
      return result[0];
    }
  }