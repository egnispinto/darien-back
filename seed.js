//Esto es un pequeño archivo para llenar puestos de estacionamiento de Pruebas
const express = require('express');
const {dbConnection} = require('./database/config.db')
const {fakeData} = require('./controllers/fakeData');
class Seed{
    
    constructor(){
        this.connectDB().then( res =>{
            this.llenarDatos();
            console.log("Importación terminada, finalice con CRT+C");
        })
        .catch( err => {
            console.log(`Ocurrio un error con el SEED ${err.message}`);
        })
    }
    //Este metodo es el encargado de levantar la conexion
    async connectDB(){
        await dbConnection();
    }
    async llenarDatos(){
        return await fakeData();
    } 
}
const fire = new Seed;
return fire;
