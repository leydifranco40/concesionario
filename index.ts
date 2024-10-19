// ENCARGADO DE CREAR EL SERVIDOR
// El servidor va a proveer el api-rest

import Express from "express";
import { routes } from "./routes/index.routes";

const createServer = () => {
  const app = Express();

  const PORT = process.env.PORT || 3000;

  app.use(Express.json())
  // Generación del primero recurso:
  // Endpoint o url: http://localhost:3000/hola-mundo
  app.get("/api", (req, res) => {
    console.log("nueva solicitud del endpoint http://localhost:3000/hola-mundo");
    res.send({
      message: "Bienvenido a la API ",
    });
  });

  /// Importar la rutas
  app.use('/api/v1', routes());
  

  

  app.listen(PORT, () => {
    console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
  });
};

createServer();