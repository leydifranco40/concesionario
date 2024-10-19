import Express from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
// Objetivo: Exponer las rutas de la api
// PATH: es la ruta
export const routesUsuarios = () => {
  const router = Express.Router();

  const usuariosCtrl = new UsuariosController();

//POST- AGREGAR EL USUARIO
  router.post("/usuarios", async(req, res) => {
    const payload = req.body
    try{
      console.log(req.body)
      const result = await usuariosCtrl.agregar(payload)
      res.send(result);
    }catch(error){
      console.error(error)
      res.status(500).send({
        message:"Ha ocurrido un error al agregar el usuario "
      }
    )
  }
  
})
//PUT- ACTUALIZAR UN USUARIO
  router.put("/usuarios", async(req, res) => {
    const payload = req.body
    try{
      const result = await usuariosCtrl.actualizar(payload)
      res.send(result);
    }catch(error){
      console.error(error)
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
    try {
    const id = parseInt(req.params.id)
    if(Number.isNaN(id)){
      res.status(400).send({ok: false, message:"Error en el ID enviado"})
      return
    }
      const result = await usuariosCtrl.obtenerPorId(id);
      if (result !== null) {
      res.send({ ok: true, info: result });
      }else{
        res.status(404).send({ok: false, message:"No se encontro el Usuario por ID"})
      }
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al consultar el usuario",
      });
    }
    
    
  });
//DELETE- ELIMINAR UNA RESERVA POR ID
  router.delete("/usuarios/:id", async(req, res) => {
    try {
    const id = parseInt(req.params.id)
    if (Number.isNaN(id)) {
      res.status(400).send({ ok: false, message: "Error en el id enviado" });
      return
    }
      const result = await usuariosCtrl.eliminar(id);
      const status = result.ok === true ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send({
        message: "Ha ocurrido un error al eliminar el usuario",
      });
    }    
  })
  return router;
}
