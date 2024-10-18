import Express from "express";
import { ReservasController } from "../controllers/reservas.controller";
// Objetivo: Exponer las rutas de la api
// PATH: es la ruta
export const routesReservas = () => {
  const router = Express.Router();

  const reservasCtrl = new ReservasController();


//POST- AGREGAR LA RESERVA
  router.post("/reservas", async(req, res) => {
    const payload = req.body
    try{
      const result = await reservasCtrl.agregar(payload)
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
    const payload = req.body
    try{
      const result = await reservasCtrl.actualizar(payload)
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
    try {
      const id = parseInt(req.params.id)
      if (Number.isNaN(id)){
        res.status(400).send({ok: false, message: "Error en el id enviado"})
      return
      }
      const result = await reservasCtrl.obtenerPorId(id);
      if (result !== null){
      res.send({ok: true, info: result});
    } else {
      res.send(400).send({ok: false, message:"No se encontro la reserva"})
    }
    }catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al consultar la reserva por ID",
      });
    }
     
  });


//DELETE- ELIMINAR UNA RESERVA POR ID
  router.delete("/reservas/:id", async(req, res) => {
    try {
      const id = parseInt(req.params.id)
      if (Number.isNaN(id)){
        res.status(400).send({ ok: false, message: "Error en el id enviado"});
        return
      }
      const result = await reservasCtrl.eliminar(id);
      const status = result.ok === true? 200 : 400
      res.status(status).send(result)
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al eliminar la reserva",
      });
    }
    
    
  });

  return router;
};