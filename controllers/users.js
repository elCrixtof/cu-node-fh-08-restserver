const { response, request }  = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { findById, findByIdAndUpdate } = require('../models/user');

const usersGet =  async (req = request, res = response) => {
    // const {q, name = 'no name', apikey, page = 1, limit} = req.query;
    const { limit = 5, from = 0 } = req.query;
    const query = {state: true}

    // const users = await User.find(query)
    //     .skip(Number(from))
    //     .limit(Number(limit));

    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    })
};

const usersPut = async (req, res = response ) => {
    const {id} = req.params
    const { _id, password, google, mail, ...rest }= req.body

    //TODO validate in DB
    if(password) {
        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);
    res.json(user)
};

const usersPost = async (req, res) => {
    const { name, mail, password, role } = req.body;
    const user = new User({name, mail, password, role});
    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    //Save in database
    await user.save();

    res.json(user)
};

const usersDelete = async(req, res) => {
    const {id} = req.params;
    // Delete completely
    // const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, {state: false});
    res.json(user)
};

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}