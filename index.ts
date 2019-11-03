import  Server  from "./classes/server";
import userRouter from "./routes/usuario";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const server = new Server();

// Midelwalware Url encoded y trasformar los datos en un obj json
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());


// Rutas
server.app.use('/user', userRouter);


// conectar DB
mongoose.connect('mongodb://127.0.0.1:27017/fotosgram', {useNewUrlParser: true, useCreateIndex:true}, (err)=>{
if(err) throw err;
console.log('base de datos ONLINE');
});

// servidor

server.start(()=>{
console.log(`servidor corriendo en el puerto ${server.port}`);
});