const express = require('express');
var cors = require('cors');
const {dbConnection} = require('../database/config.db')
require("dotenv").config();
class Server {
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;
        //ConectarBD
        this.connectDB();
        //middlewares
        this.midlewares();
        this.pathUser = '/api/usuarios'; //Cambiar a ingles
        this.pathAuth = '/api/auth';
        this.pathItems = '/api/items';
        this.pathDpto = '/api/dpto';
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }
    midlewares(){
        //CORS
        this.app.use(cors());
        //Parseo
        this.app.use(express.json());
       // this.app.use(express.static('public/'));
    }
    routes(){
        this.app.use(this.pathAuth, require('../routes/auth')); 
        this.app.use(this.pathUser, require('../routes/user')); 
        this.app.use(this.pathItems, require('../routes/item')); 
    }

    listen(){
        this.app.listen( this.PORT, () =>{
            console.log(`Servidor corriendo en el puerto (${this.PORT })`)
        })
    }
}
module.exports = Server;