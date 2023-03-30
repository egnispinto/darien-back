const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const validarJWT = (req = request, res = response, next) =>{
    const token = req.header('name-token-app'); //Esto parámetro debe ser configurable
    if(!token){
        return res.status(401).json({
            msg : 'No existe token'
        });  
    }
    try {
        const {uid} = jwt.verify(token, process.env.CLAVE);
        if(uid){
            req.uid = uid;
            //Leer usuario
            req.userAuth = Usuario.findById( uid );
            next();
        }else{
            return res.status(401).json({
                msg : 'ID empty'
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            msg : 'Token no válido'
        })
    }
    
}

module.exports = {
    validarJWT
}