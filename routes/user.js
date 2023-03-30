const {Router} = require('express');
const { check } = require('express-validator');
const {userGet,userPost,userPut, userDelete} = require('../controllers/user');
const {validar} = require('../middleware/validar');
const { validarJWT } = require('../middleware/validate-jwt');
let router = Router();
router.get('/',  userGet);

router.post('/',[
    check('nombre', 'No puede estar vacio').not().isEmpty(),
    check('cedula', 'No puede estar vacio').not().isEmpty(),
    check('contrasenia', 'No puede estar vacio').not().isEmpty(),
    check('correo', 'El correo es incorrecto').isEmail(),
    validar
] , userPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No Existe').isMongoId(),
    check('nombre', 'No puede estar vacio').not().isEmpty(),
    check('correo', 'El correo es incorrecto').isEmail(),
    validar
], userPut);

router.delete('/:id', [
    check('id', 'No Existe').isMongoId(),
    validar
], userDelete);
module.exports = router;