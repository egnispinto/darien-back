const {Router} = require('express');
const { check } = require('express-validator');
const {itemsGet,itemsPost,itemsPut, itemDelete} = require('../controllers/items');
const {validar} = require('../middleware/validar');
let router = Router();
router.get('/',  itemsGet);

router.post('/',[
    check('name_articulo', 'No puede estar vacio').not().isEmpty(),
    check('price_bs', 'No puede estar vacio').not().isEmpty(),
    check('id_impuesto', 'No puede estar vacio').not().isEmpty(),
    validar
] , itemsPost);

router.put('/:id', [
    check('id', 'No Existe').isMongoId(),
    validar
], itemsPut);

router.delete('/:id', [
    check('id', 'No Existe').isMongoId(),
    validar
], itemDelete);
module.exports = router;