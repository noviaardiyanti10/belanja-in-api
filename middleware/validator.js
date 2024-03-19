const {validationResult, check, param } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ 
            "code": 401,
            "message": errors.errors,
            "data": null
        });
    }
    next();
};

const validateUser = [
    check('name').not().isEmpty().withMessage('required').isAlphanumeric(),
    check('email').not().isEmpty().withMessage('required').isEmail(),
    check('phone').not().isEmpty().withMessage('required').isNumeric(),
    check('password').not().isEmpty().withMessage('required').isAlphanumeric(),
];

const validateProfile = [
    check('name').not().isEmpty().withMessage('required'),
    check('email').not().isEmpty().withMessage('required').isEmail(),
    check('phone').not().isEmpty().withMessage('required').isNumeric(),
];

const validateProduct = [
    check('name').notEmpty().withMessage('required'),
    check('price').notEmpty().isInt().withMessage('required'),
    check('photo').custom((value, { req }) => {
        if (req.file) {
            return true;
        }
        
    }),
]

const validateDetail = [
    check('name').notEmpty().withMessage('required'),
    check('price').notEmpty().isInt().withMessage('required'),
]

module.exports = {
    validate,
    validateUser,
    validateProfile,
    validateProduct,
    validateDetail
};
