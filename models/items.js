const {Schema, model} = require('mongoose');
const {MENSAJES} = require('../config/variables');
const itemsSchema = Schema({
    price_bs : {
        type : String,
    },
    price_usd : {
        type : String,
    },
    name_articulo : {
        type : String,
    },
    departamento : {
        type : String,
    },
    id_impuesto : {
        type : String,
    },
    url_img : {
        type : String,
    },
    requiere_peso : {
        type : String,
    },
    requiere_precio : {
        type : String,
    },
});
//Personalizacion de objetos y respuestas
itemsSchema.methods.toJSON = function() {
    const { __v, ...items} = this.toObject();
    return items;
}
module.exports = model('Items', itemsSchema);