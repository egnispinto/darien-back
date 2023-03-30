const mongoose = require('mongoose');
require("dotenv").config();

//Aqui pudiera leer un valor de configuracion de Variables y en base a ese valor decidir a cual BD Conectarme
//Ej si quiero SQLite3 o PostgreSQL etc
const dbConnection = async () =>{
    try {
        let uriMongoDb=`mongodb+srv://${process.env.USERMONGODB}:${process.env.PASSMONGODB}@${process.env.URIMONGODB}/${process.env.MONGONAME}`;
        await mongoose.connect(process.env.URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true,
            useFindAndModify : false
        });
        console.log('Base de datos Online');
    } catch (error) {
        console.log(error.message);
        new Error('Error al conectar a la BD');
    }
}

module.exports = {
    dbConnection
}
//Pruebas
//NRYRtp0HJXRHcFvD