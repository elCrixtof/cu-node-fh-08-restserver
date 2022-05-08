const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res = response, next) => {
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'There is not a token in the request'
        });
    }

    try {
        const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await User.findById(uid);
        if( !user ) {
            return res.status(401).json({
                msg: 'Invalid token - user deleted from DB'
            })
        }
        if( !user.state ){
            return res.status(401).json({
                msg: 'Invalid token - state: false'
            })
        }
        req.user = user
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Invalid token',
            err: error.message
        })
    }

}

module.exports = {
    validateJWT
}