const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


// create user
router.get('/signup', userController.signup_get);
router.post('/signup', userController.signup_post);

// login
router.get('/login', userController.login_get);
router.post('/login', userController.login_post);


// update user
router.get('/:id/update', userController.updateUser_get);
router.post('/:id/update', userController.updateUser_post);

// delete user
router.post('/:id/delete', userController.deleteUser_post);

// logout
router.get('/logout', userController.logout_get);

// change password
router.get('/change-password', userController.changePassword_get);
router.post('/change-password', userController.changePassword_post);


// get user by id
router.get('/:id', userController.getUserById);


module.exports = router;
