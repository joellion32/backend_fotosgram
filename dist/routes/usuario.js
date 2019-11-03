"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../models/usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRouter = express_1.Router();
// ruta para login 
userRouter.post('/login', (req, resp) => {
    const body = req.body;
    usuario_1.Usuario.findOne({ email: body.email }, (err, UserDB) => {
        if (err)
            throw err;
        if (!UserDB) {
            return resp.json({
                ok: false,
                mensaje: 'los datos del usuario son incorrectos'
            });
        }
        // comparar la clave con la de la BD
        if (UserDB.CompararPassword(body.password)) {
            return resp.json({
                ok: true,
                token: 'AAAAAAAADSADADADADADADADA'
            });
        }
        else {
            return resp.json({
                ok: false,
                mensaje: 'los datos del usuario son incorrectos'
            });
        }
    });
}); // cierre del metodo
// ruta para crear usuario
userRouter.post('/create', (req, resp) => {
    // recibir datos del usuario    
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        // obtener la clave y encriptarla
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    // guardar usuario en la BD
    usuario_1.Usuario.create(user).then(UserDB => {
        resp.json({
            ok: true,
            mensaje: 'Usuario creado correctamente',
            UserDB
        });
    }).catch(err => {
        resp.json({
            ok: false,
            mensaje: 'Error al crear usuario',
        });
    });
});
exports.default = userRouter;
