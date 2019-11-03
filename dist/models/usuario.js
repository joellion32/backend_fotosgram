"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
// modelo de base de datos en mongo
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'avatar1.png'
    },
    email: {
        type: String,
        required: [true, 'el email es necesario']
    },
    password: {
        type: String,
        required: [true, 'el password es necesario']
    }
});
// metodo para comparar la password
usuarioSchema.method('CompararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
// exportar el modelo para poder utlizarlo en otro lado
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
