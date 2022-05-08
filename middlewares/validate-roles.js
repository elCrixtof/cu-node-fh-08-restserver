const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
    if( !req.user ) {
        return res.status(500).json({
            msg: 'It is impossible to verify user without a valid token'
        })
    }
    const { role, name } = req.user;
    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${name} is not an administrator - You can't do this`
        })
    }
    next();
}

const hasRole = ( ...roles ) => {
    return (req, res = response, next) => {
        if( !req.user ) {
            return res.status(500).json({
                msg: 'It is impossible to verify user without a valid token'
            })
        }
        const { role, name } = req.user;
        if ( !roles.includes( req.user.role )) {
            return res.status(401).json({
                msg: `${name} doesn't have a valid role, The service requires one of this roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}