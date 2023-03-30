const {response} = require('express');
const Items = require('../models/items');

const itemsGet = async (req, res = response) => { 
    const {desde = 0} = req.query;
    const queryWhere = { status :  true};
    //Destructuracion de arreglos
    const [total, items] = await  Promise.all([
        Items.count(),
        Items.find()
            .skip( Number(desde))
 //           .limit( Number(limite))
    ])
    return res.json({
        total,
        articulos: items
    })
}   
const itemsPost = async (req, res = response) => {
    try {
        //Destructuracion
        const {price_bs, price_usd, name_articulo, departamento,id_impuesto,  url_img,requiere_peso, requiere_precio} =  req.body;
        //Creo una instancia del objeto
        const created = new Items({ price_bs, price_usd, name_articulo, departamento,id_impuesto,  url_img,requiere_peso, requiere_precio });
       
        await created.save();
        res.json({
            created
        })
    } catch (error) {
        res.json({
            error
        })
        throw new Error(error);
        
    }
    
}  
const itemsPut = async (req, res = response) => { 
    try {
        const {id} = req.params;
        const {codigo, ...resto} =  req.body;
        //Lo hago para poder buscar en el findOne;
        const _id = id;
        //Encriptacion
        
        //Actualizo
        await Items.findByIdAndUpdate(id, resto ).then( async(resp) =>{
            let itemUpdate = await Items.findOne({_id});
            return res.json({
                itemUpdate
            })
        })
        .catch( err =>{
            return res.status(400).json({err}) 
        } ) 
        
    } catch (error) {
        throw new Error(error);
    }
    
} 
const itemDelete = async (req, res = response) => { 
    try {
        const {id} = req.params;
        const {...resto} =  req.body;
        //Lo hago para poder buscar en el findOne;
        const _id = id;
        //Elimino
        const updateItem = await Items.findByIdAndDelete(id).then( async(resp) =>{
            let itemDelete = await Items.findOne({id});
            return res.json({
                itemDelete
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
    itemsGet,
    itemsPost,
    itemsPut,
    itemDelete
}