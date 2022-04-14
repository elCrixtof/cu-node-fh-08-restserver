const { response, request }  = require('express')

const usersGet =  (req = request, res = response) => {
    const {q, name = 'no name', apikey, page = 1, limit} = req.query;
    res.json({
        msg: 'get API',
        q,
        name,
        apikey,
        page, 
        limit
    })
};

const usersPut = (req, res) => {
    const {id, date} = req.params
    res.json({
        msg: 'put API',
        id,
        date
    })
};

const usersPost = (req, res) => {
    const {name , age} = req.body;

    res.json({
        msg: 'post API',
        name,
        age
    })
};

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API'
    })
};

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}