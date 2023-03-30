const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs')

const userGet = async (req, res = response) => { 
    const {desde = 0, limite =5} = req.query;
    const queryWhere = { status :  true};
    //Destructuracion de arreglos
    const [total, usuario] = await  Promise.all([
        Usuario.count(),
        Usuario.find()
            .skip( Number(desde))
            .limit( Number(limite))
    ])
    return res.json({
        total,
        usuario
    })
}   
const userPost = async (req, res = response) => {
    try {
        //Destructuracion
        const {nombre,cedula,correo,contrasenia,perfil} =  req.body;
        //Creo una instancia del objeto
        const usuario = new Usuario({ nombre, cedula, correo, contrasenia, perfil });
        //Encriptacion
        const salt = bcryptjs.genSaltSync();
        usuario.contrasenia = bcryptjs.hashSync(contrasenia,salt);
        //Validacion de Cedula
        const validateCedula = await Usuario.findOne({cedula});
        if(validateCedula){
            return res.status(400).json({
                message : 'Existe Cedula'
            });
        }
        //Validacion correo
        const validateEmail = await Usuario.findOne({correo});
        if(validateEmail){
            return res.status(400).json({
                message : 'Existe correo'
            });
        }
        await usuario.save();
        res.json({
            usuario
        })
    } catch (error) {
        res.json({
            error
        })
        throw new Error(error);
        
    }
    
}  
const userPut = async (req, res = response) => { 
    try {
        const {id} = req.params;
        //Extraigo la cedula correo y contrasenia del body
        const {cedula,contrasenia, correo, ...resto} =  req.body;
        //Lo hago para poder buscar en el findOne;
        const _id = id;
        //Encriptacion
        const salt = bcryptjs.genSaltSync();
        //Agrego al array resto la nueva contrasenia
        resto.contrasenia = bcryptjs.hashSync(contrasenia,salt);
        //Valido el correo
        //Actualizo
        await Usuario.findByIdAndUpdate(id, resto ).then( async(resp) =>{
            let userUpdate = await Usuario.findOne({_id});
            return res.json({
                userUpdate
            })
        })
        .catch( err =>{
            return res.status(400).json({err}) 
        } ) 
        
    } catch (error) {
        throw new Error(error);
    }
    
} 
const userDelete = async (req, res = response) => { 
    try {
        const {id} = req.params;
        const {...resto} =  req.body;
        //Lo hago para poder buscar en el findOne;
        const _id = id;
        //Elimino
        const updateUser = await Usuario.findByIdAndDelete(id).then( async(resp) =>{
            let userDelete = await Usuario.findOne({id});
            return res.json({
                userDelete
            })
        })
        .catch( err =>{
            return res.status(400).json({err}) 
        } ) 
        
    } catch (error) {
        throw new Error(error);
    }
    
} 
module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}