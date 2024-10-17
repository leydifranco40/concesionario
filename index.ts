// ENCARGADO DE CREAR EL SERVIDOR
// El servidor va a proveer el api-rest

import Express from "express";
import { routesReservas} from "./routes/reservas"
import { routesUsuarios } from "./routes/usuarios";
import { routesVehiculos } from "./routes/vehiculos";

const createServer = () => {
  const app = Express();

  const PORT = process.env.PORT || 3000;

  // Generación del primero recurso:
  // Endpoint o url: http://localhost:3000/hola-mundo
  app.get("/api", (req, res) => {
    console.log("nueva solicitud del endpoint http://localhost:3000/hola-mundo");
    res.send({
      message: "Bienvenido a la API ",
    });
  });

  /// Importar la rutas
  app.use('/api/v1', routesReservas());
  app.use('/api/v1', routesUsuarios())
  app.use('/api/v1', routesVehiculos())

  

  app.listen(PORT, () => {
    console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
  });
};

createServer();