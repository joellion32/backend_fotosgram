"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = new server_1.default();
// Midelwalware Url encoded y trasformar los datos en un obj json
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Rutas
server.app.use('/user', usuario_1.default);
// conectar DB
mongoose_1.default.connect('mongodb://127.0.0.1:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('base de datos ONLINE');
});
// servidor
server.start(() => {
    console.log(`servidor corriendo en el puerto ${server.port}`);
});
