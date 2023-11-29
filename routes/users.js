const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// get all users
router.get('/', userController.getAllUsers);


// get user by username
router.get('/username/:username', userController.getUserByUsername);

// create user
router.get('/create', userController.createUser_get);
router.post('/create', userController.createUser_post);

// update user
router.get('/update', userController.updateUser_get);
router.post('/update', userController.updateUser_post);

// delete user
router.get('/delete', userController.deleteUser_get);
router.post('/delete', userController.deleteUser_post);

// get user by id
router.get('/:id', userController.getUserById);


module.exports = router;
