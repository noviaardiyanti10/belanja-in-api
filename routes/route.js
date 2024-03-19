const router = require("express").Router();
const {validate, validateUser, validateProfile, validateProduct, validateDetail} = require('../middleware/validator');

const {
    create,
    update,
    findUser,
    deleteUser
} = require('../controllers/userController');

const {
    insertProduct,
    updateProduct,
    findProduct,
    deleteProduct,
    getProduct
} = require('../controllers/productController');

router.post('/user/create', [validateUser, validate], create);
router.put('/user/update/:id', [validateProfile, validate], update);
router.get('/user/find/:id', findUser);
router.delete('/user/delete/:id', deleteUser);

router.post('/product/create',[validateProduct, validate], insertProduct)
router.put('/product/update/:id',[validateDetail, validate], updateProduct)
router.get('/product/find/:id', findProduct)
router.delete('/product/delete/:id', deleteProduct)
router.get('/product/get', getProduct)

module.exports = router;