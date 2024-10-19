import Express from "express";
import { VehiculosController } from "../controllers/vehiculos.controller";


export const routesVehiculos = () => {
  const router = Express.Router();

  const vehiculosCtrl = new VehiculosController();

//POST- AGREGAR EL VEHICULO
  router.post("/vehiculos", async(req, res) => {
    const payload = req.body
    try{
      const result = await vehiculosCtrl.agregar(payload)
      res.send(result);
    }catch(error){
      console.error(error)
      res.status(500).send({
        message:"Ha ocurrido un error al agregar el vehiculo "
      }
    )
  }
  
})
//PUT- ACTUALIZAR UN VEHICULO
  router.put("/vehiculos", async(req, res) => {
    const payload = req.body
    try{
      const result = await vehiculosCtrl.actualizar(payload)
      res.send(result);
    }catch(error){
      console.error(error)
      res.status(500).send({
        message:"Ha ocurrido un error al actualizar el vehiculo "
      }
    )
  }
          
    
    
  });
//GET - OBTENER TODOS LOS VEHICULOS
  router.get("/vehiculos", async (_, res) => {
    try {
      const result = await vehiculosCtrl.obtener();
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al consultar los vehiculos",
      });
    }
  });

  //GET- OBTENER UN VEHICULO POR ID
  router.get("/vehiculos/:id", async(req, res) => {
    try {
    const id = parseInt(req.params.id)
    if(Number.isNaN(id)){
      res.status(400).send({ok: false, message:"Error en el ID enviado"})
      return
    }
      const result = await vehiculosCtrl.obtenerPorId(id);
      if (result !== null) {
      res.send({ ok: true, info: result });
      }else{
        res.status(404).send({ok: false, message:"No se encontro el Vehiculo por ID"})
      }
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al consultar el vehiculo",
      });
    }
    
    
  });
//DELETE- ELIMINAR UN VEHICULO POR ID
  router.delete("/vehiculos/:id", async(req, res) => {
    try {
    const id = parseInt(req.params.id)
    if (Number.isNaN(id)) {
      res.status(400).send({ ok: false, message: "Error en el id enviado" });
      return
    }
      const result = await vehiculosCtrl.eliminar(id);
      const status = result.ok === true ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al eliminar el vehiculo",
      });
    }
  })
  return router;
}