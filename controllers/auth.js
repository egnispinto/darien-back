const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const postLogin = async (req, res = response) => { 
    try {
        //Valida si el usuario existe
        const {correo,contrasenia} =  req.body;
        const validateUser = await Usuario.findOne({correo});
        if(!validateUser){
            return res.status(400).json({
                message : 'No existe el correo'
            });
        }
        //Valido las contraseñas
        const validatePassword = bcryptjs.compareSync( contrasenia , validateUser.contrasenia);
        if( !validatePassword ){
            return res.status(400).json({
                message : 'Password invalido'
            });
        } 
        const token = await generateJWT(validateUser.id);
        return res.json({
            validateUser,
            token
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}  

module.exports = {
    postLogin
}