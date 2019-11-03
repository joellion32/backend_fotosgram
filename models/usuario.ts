import { Schema, model } from "mongoose";
import  bcrypt  from "bcrypt" 


// modelo de base de datos en mongo
const usuarioSchema = new Schema({
nombre:{
type: String,
required: [true, 'el nombre es necesario']    
},
avatar:{
type: String,
default: 'avatar1.png'    
},
email:{
type: String,
required: [true, 'el email es necesario']    
},
password:{
type: String,
required: [true, 'el password es necesario']    
}

});

// metodo para comparar la password
usuarioSchema.method('CompararPassword', function(password: string = ''): boolean {
if(bcrypt.compareSync(password, this.password)){
return true;    
}else{
return false;    
}  
});



// exportar el modelo para poder utlizarlo en otro lado
export const Usuario = model('Usuario', usuarioSchema);


