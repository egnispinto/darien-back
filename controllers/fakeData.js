const Puesto = require('../models/puestos');

const fakeData = () =>{
    llenaDatos();
}

const llenaDatos = async () =>{
    const status = "1";
    const reservado = false;
    const id_reserva = "";
    //Borro toda la coleccion existente
    await Puesto.deleteMany({}).then(res =>{
        for (let i = 1; i < 21; i++) {
            let numero = i;
            let id_control = "";
            let  puesto = new Puesto({ numero, status, id_control,reservado, id_reserva});     
            puesto.save();
        }
    })
}
module.exports = {
    fakeData
}