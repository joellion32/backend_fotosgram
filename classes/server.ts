// librerias
import Express from "express";


export default class Server {

// variables globales
public app: Express.Application;
public port: number = 3000;

constructor(){
this.app = Express();
}

// function para la escucha del servidor
start(callback: Function){
this.app.listen( this.port, callback );
}

} // cierre de la clase