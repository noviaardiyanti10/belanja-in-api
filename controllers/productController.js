const {Product} = require('../models')
const {Op} = require('sequelize');

const insertProduct = async(req, res) => {
    const {name, price, description} = req.body;
    const  photo = req.file.path;

    try {
        const product = await Product.create({
            name:name,
            price: price,
            photo:photo,
            description:description
        });
    
        return res.status(201).json({
            code: 201,
            message: "success",
            data: {
                id: product.id,
            }
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "error",
            data: error
        });
    }
    
}

const updateProduct = async(req, res) => {
    const {name, price, description} = req.body;

    const product = await Product.findOne({where: {id: req.params.id}});

    if(!product){
        return res.status(401).json({
            "code": 400,
            "message": "Data not found",
            "data": null
        });
    }

    const photo = req.file?.path ?? product.photo;

    try {
        await product.update({
            name,price, description,photo
        })

        return res.status(200).json({
            code: 200,
            message: "success",
            data: {
                id: product.id,
            }
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "error",
            data: error
        });
    }
}

const findProduct = async(req, res) =>{
    const product = await Product.findOne({
        attributes: ['id','name', 'price','photo','description'],
        where: {id: req.params.id}
    });

    if(!product){
        return res.status(401).json({
            "code": 400,
            "message": "Data not found",
            "data": null
        });
    }

    return res.status(200).json({
        code: 200,
        message: "success",
        data: product
    });
}

const deleteProduct = async(req, res) => {
    const products = await Product.findOne({where: {id: req.params.id}});

    if(!products){
        return res.status(401).json({
            "code": 400,
            "message": "Data not found",
            "data": null
        });
    }

    await Product.destroy({
        where: {id: products.id},
        force: false
    });

    return res.status(200).json({
        code: 201,
        message: "success",
        data: null
    });

}

const getProduct = async(req, res) => {
    const {skip, take, search} = req.query;

    const query = {};
    const num_skip = skip ? parseInt(skip) : 0;
    const num_take = take ? parseInt(take) : 0;

    if(search){
        query.name = {[Op.like]: `%${search}%`};
    }

    const products = await Product.findAll({
        attributes: ['id','name', 'price','photo','description'],
        where: query,
        offset: num_skip,
        limit: num_take
    });

    
    return res.status(200).json({
        code: 200,
        message: "success",
        data: products
    });
}
module.exports = {
    insertProduct,
    updateProduct,
    findProduct,
    deleteProduct,
    getProduct
}