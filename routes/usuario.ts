import { Router, Request, Response} from "express";
import { Usuario } from "../models/usuario";
import  bcrypt  from "bcrypt" 

const userRouter = Router();


// ruta para login 
userRouter.post('/login', (req: Request, resp: Response)=>{
const body = req.body;

Usuario.findOne({email: body.email}, (err, UserDB)=> {
if(err) throw err;

if(!UserDB){
return resp.json({
ok: false,
mensaje: 'los datos del usuario son incorrectos'
});  
}

// comparar la clave con la de la BD
if(UserDB.CompararPassword(body.password)){
return resp.json({
ok: true,
token: 'AAAAAAAADSADADADADADADADA'
}); 
}else{
return resp.json({
ok: false,
mensaje: 'los datos del usuario son incorrectos'
});     
}

});

}); // cierre del metodo




// ruta para crear usuario
userRouter.post('/create', (req: Request, resp: Response)=>{


// recibir datos del usuario    
const user = {
nombre: req.body.nombre,
email: req.body.email,
// obtener la clave y encriptarla
password: bcrypt.hashSync(req.body.password, 10),
avatar: req.body.avatar   
};

// guardar usuario en la BD
Usuario.create(user).then(UserDB=>{
resp.json({
ok: true,
mensaje: 'Usuario creado correctamente',
UserDB
});

}).catch(
err=> {
resp.json({
ok: false,
mensaje: 'Error al crear usuario',
});    
}
);




}); 


export default userRouter;
