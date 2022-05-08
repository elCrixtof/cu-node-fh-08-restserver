const { response, request }  = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = require, res = response) => {
    try {
        const { mail, password } = req.body;

        // Find user by mail 
        const user = await User.findOne({mail});
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are not corrects - mail'
            })
        }

        // User do exist
        if ( !user.state ) {
            return res.status(400).json({
                msg: `User / Password are not corrects - status: false`
            })
        }

        // Verify password
        const validatePassword = bcryptjs.compareSync(password, user.password);
        if( !validatePassword ) {
            return res.status(400).json({
                msg: 'msg: User / Password are not corrects - password'
            })
        }


        // Authenticate user and generate password
        const token = await generarJWT(user.id);

        // console.log(user);
        
        res.json({
            user,
            token
        });
    } catch (error) {
        // console.log(typeof(error));
        // console.log(error.message);
        console.log(error);
        res.status(500).json({
            msg: error.message,
            type: error.name
        })
    }
}

module.exports = {
    login
}