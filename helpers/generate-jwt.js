const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateJWT = async ( uid = '') =>{

    return new Promise( (resolve, reject) =>{
        const payload = {uid};
        jwt.sign(payload,process.env.CLAVE, {
            expiresIn : '4h'
        }, 
        (err , token) => {
            if(err){
                console.log(err);
                reject(err)
            }
            resolve(token);
        })
    })
}

module.exports = {
    generateJWT
}