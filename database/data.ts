import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos
import config from "../config/default";

/**
 * Crear una conexión a la base de datos
 * @returns Conexión a la base de datos
 */
export const getPoolConnection =  () => {
  const connection = mysql.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
    port: config.PORT,
  });
  return connection;
};
