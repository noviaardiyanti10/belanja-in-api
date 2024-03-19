const { Op } = require('sequelize');
const {User} = require('../models');
const bcrypt = require('bcrypt');

const create = async(req, res) => {
    const {email, name, phone, password} = req.body;

    try {
        const userCheck = await User.findAll({ where: { [Op.or]: {email: email, phone: phone, },  }});     

        if(userCheck.length > 0){
            return res.status(401).json({
                "code": 401,
                "message": "Email or phone already exist",
                "data": null
            });
        }

        encrypt = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: encrypt,
            role: "user",
            status: 1
        });

        return res.status(201).json({
            code: 201,
            message: "success",
            data: email
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "error",
            data: error
        });
    }
}

const update = async(req, res) => {
    const {email, name, phone} = req.body;

    const user = await User.findOne({where: {id: req.params.id}});
    
    if(!user){
        return res.status(400).json({
            "code": 400,
            "message": "Data not found",
            "data": null
        });
    }


    try {
        
        const userCheck = await User.findAll({ 
            where: { 
                [Op.or]: {email: email, phone: phone },
                [Op.not]: {id: user.id} 
            }
        }); 
        
        if(userCheck.length > 0){
            return res.status(401).json({
                "code": 401,
                "message": "Email or phone already exist",
                "data": null
            });
        }

        await user.update({
            name,
            email,
            phone,
        });

        return res.status(200).json({
            code: 200,
            message: "success",
            data: email
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "error",
            data: error
        });
    }
}

const findUser = async(req, res) => {
    const user = await User.findOne({
        attributes: ['name', 'email','phone','status'],
        where: {id: req.params.id}
    });

    if(!user){
        return res.status(400).json({
            "code": 400,
            "message": "Data not found",
            "data": null
        });
    }

    return res.status(200).json({
        code: 200,
        message: "success",
        data: user
    });

}

const deleteUser = async(req, res) => {
    const user = await User.findOne({
        where: {id: req.params.id}
    });

    if(!user){
        return res.status(400).json({
            "code": 400,
            "message": "Data not found",
            "data": null
        });
    }

    await User.destroy({
        where: {id: user.id},
        force: false
    })

    return res.status(200).json({
        code: 200,
        message: "success",
        data: null
    });

}
module.exports = {
    create,
    update,
    findUser,
    deleteUser
}