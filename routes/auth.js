const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const {
    login
} = require('../controllers/auth');

const { 
    mailValidation,
} = require('../helpers/db-validators');
const res = require('express/lib/response');


const router = Router();

router.post('/login', [
    check('mail', 'The Mail is necesary').isEmail(),
    check('password', 'The password is necesary').not().isEmpty(),
    validateFields
], login);

module.exports = router