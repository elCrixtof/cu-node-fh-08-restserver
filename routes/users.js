const { Router } = require('express');
const { check } = require('express-validator');

// const { validateFields } = require('../middlewares/validate-fields');
// const { validateJWT } = require('../middlewares/validate-jwt')
// const { isAdminRole, hasRole } = require('../middlewares/validate-roles');
const {
    validateFields,
    validateJWT,
    isAdminRole,
    hasRole
} = require('../middlewares');

const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
} = require('../controllers/users');

const { 
    isValidRole, 
    // isAdminRole,
    mailValidation,
    existUserById
} = require('../helpers/db-validators')

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validateFields
], usersPut);

router.post('/', [
    check('password', 'The password must have more than 6 letters').isLength({min: 6}),
    check('name', 'The name is required').not().isEmpty(),
    check('mail', 'The mail is not valid').isEmail(),
    // check('role', 'It is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('mail').custom(mailValidation),
    check('role').custom(isValidRole),
    validateFields
], usersPost);

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], usersDelete);

module.exports = router;