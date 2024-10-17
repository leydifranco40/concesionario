import Express from "express";
import { ReservasController } from "../controllers/reservas.controller";
// Objetivo: Exponer las rutas de la api
// PATH: es la ruta
export const routesReservas = () => {
  const router = Express.Router();

  const reservasCtrl = new ReservasController();
//POST- AGREGAR LA RESERVA
  router.post("/reservas", async(req, res) => {
    try{
      const result = await reservasCtrl.agregar(req.body)
      res.send(result);
    }catch(error){
      res.status(500).send({
        message:"ha ocurrido un error al agregar la reserva "
      }
    )
  }
  
})
//PUT- ACTUALIZAR UNA RESERVA
  router.put("/reservas", async(req, res) => {
    try{
      const result = await reservasCtrl.actualizar(req.body)
      res.send(result);
    }catch(error){
      res.status(500).send({
        message:"ha ocurrido un error al actualizar la reserva "
      }
        
      )
    }
    
  });
//GET - OBTENER TODAS LAS RESERVAS 
  router.get("/reservas", async (_, res) => {
    try {
      const result = await reservasCtrl.obtener();
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al consultar las reservas",
      });
    }
  });

  //GET- OBTENER UNA RESERVA POR ID
  router.get("/reservas/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    try {
      const result = await reservasCtrl.obtenerPorId(id);
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al consultar la reserva por ID",
      });
    }
    
    
  });
//DELETE- ELIMINAR UNA RESERVA POR ID
  router.delete("/reservas/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    try {
      const result = await reservasCtrl.eliminar(id);
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al eliminar la reserva",
      });
    }
    
    
  });

  return router;
};