const {Router} = require('express');
const { check } = require('express-validator');
const {postLogin} = require('../controllers/auth');
const {validar} = require('../middleware/validar');
let router = Router();

router.post('/login',[
    check('correo', 'El correo es incorrecto').isEmail(),
    check('contrasenia', 'Contraseña mno puede estar vacio').not().isEmpty(),
    validar
] , postLogin);

module.exports = router;