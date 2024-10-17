import Express from "express";
import { VehiculosController } from "../controllers/vehiculos.controller";


export const routesVehiculos = () => {
  const router = Express.Router();

  const vehiculosCtrl = new VehiculosController();

//POST- AGREGAR EL VEHICULO
  router.post("/vehiculos", async(req, res) => {
    try{
      const result = await vehiculosCtrl.agregar(req.body)
      res.send(result);
    }catch(error){
      res.status(500).send({
        message:"Ha ocurrido un error al agregar el vehiculo "
      }
    )
  }
  
})
//PUT- ACTUALIZAR UN VEHICULO
  router.put("/vehiculos", async(req, res) => {
    try{
      const result = await vehiculosCtrl.actualizar(req.body)
      res.send(result);
    }catch(error){
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
    const id = parseInt(req.params.id)
    try {
      const result = await vehiculosCtrl.obtenerPorId(id);
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al consultar el vehiculo",
      });
    }
    
    
  });
//DELETE- ELIMINAR UN VEHICULO POR ID
  router.delete("/vehiculos/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    try {
      const result = await vehiculosCtrl.eliminar(id);
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al eliminar el vehiculo",
      });
    }
    
    
  })
  return router;
}