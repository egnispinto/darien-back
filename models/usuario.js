const {Schema, model} = require('mongoose');
const {MENSAJES} = require('../config/variables');
const usuarioSchema = Schema({
    nombre : {
        type : String,
        required : [true, MENSAJES.nombre]
    },
    cedula : {
        type : String,
        required : [true, MENSAJES.cedula],
        unique : true
    },
    correo : {
        type : String,
        required : [true, MENSAJES.cedula],
        unique : true
    },
    contrasenia : {
        type : String,
        required : [true, MENSAJES.contrasenia],
        unique : true
    },
    perfil : {
        type : String,
        required : [true, MENSAJES.perfil]
    }
});
//Personalizacion de objetos y respuestas
usuarioSchema.methods.toJSON = function() {
    const { __v, contrasenia, ...usuario} = this.toObject();
    return usuario;
}
module.exports = model('Usuario', usuarioSchema);