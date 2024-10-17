import Express from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
// Objetivo: Exponer las rutas de la api
// PATH: es la ruta
export const routesUsuarios = () => {
  const router = Express.Router();

  const usuariosCtrl = new UsuariosController();

//POST- AGREGAR EL USUARIO
  router.post("/usuarios", async(req, res) => {
    try{
      const result = await usuariosCtrl.agregar(req.body)
      res.send(result);
    }catch(error){
      res.status(500).send({
        message:"Ha ocurrido un error al agregar el usuario "
      }
    )
  }
  
})
//PUT- ACTUALIZAR UN USUARIO
  router.put("/usuarios", async(req, res) => {
    try{
      const result = await usuariosCtrl.actualizar(req.body)
      res.send(result);
    }catch(error){
      res.status(500).send({
        message:"Ha ocurrido un error al actualizar el usuario "
      }
        
      )
    }
    
  });
//GET - OBTENER TODOS LOS USUARIOS 
  router.get("/usuarios", async (_, res) => {
    try {
      const result = await usuariosCtrl.obtener();
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al consultar los usuarios",
      });
    }
  });

  //GET- OBTENER UN USUARIO POR ID
  router.get("/usuarios/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    try {
      const result = await usuariosCtrl.obtenerPorId(id);
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al consultar el usuario",
      });
    }
    
    
  });
//DELETE- ELIMINAR UNA RESERVA POR ID
  router.delete("/usuarios/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    try {
      const result = await usuariosCtrl.eliminar(id);
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al eliminar el usuario",
      });
    }
    
    
  })
  return router;
}
