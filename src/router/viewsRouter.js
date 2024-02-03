import { Router } from "express";
import { productsModel } from "../dao/models/productsModel.js";
import { passportCall, securityAcces } from "../utils.js";
import { currentDTO } from "../DTO/currentDTO.js";
export const router = Router();

export const auth =(req,res,next)=>{
  if(!req.session.user){
    res.redirect('/login?error=Debes iniciar sesion para acceder a la web')
  }
  next()
}

router.get("/", async (req, res) => {
  try {
    res.status(200).render("index");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/registro',(req,res)=>{
  let {error} = req.query
  
  res.status(200).render('register', {error});
});

router.get('/login',(req,res)=>{
  let {error, message} = req.query 
  
  res.status(200).render('login', {error, message});
});

router.get('/current',passportCall('jwt'),securityAcces(["public"]),async(req,res)=>{
  let user = req.user
  user = await currentDTO(user)
  res.status(200).render('perfil', {user});

});

/* ENDPOINT PARA PROBAR SEGURIDAD */
router.get('/support', passportCall('jwt'),securityAcces(["admin"]),(req,res)=>{
  res.render('support')
})

/* ERROR HANDLEBAR GENERAL */
router.get('/errorHandlebars', securityAcces(["public"]),(req,res)=>{
 let {error} = req.query
  res.render('errorHandlebars', {error})
})

/* ERROR SERVIDOR */
router.get('/errorServer', securityAcces(["public"]),(req,res)=>{
  res.render('errorServer')
})

/* TOMA ENDPOINT ENPOINT ERRONEO */
router.get('*', securityAcces(["public"]),(req,res)=>{
  res.render('404')
})