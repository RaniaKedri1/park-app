const express = require('express');
const { register, login, getAllUsers, deleteUser } = require('../controllers/userController');
// const authMiddleware = require('../middlewars/authMiddlewares')
const router = express.Router();

router.
    post('/register', register)
    .post('/login', login)
    .get('/', getAllUsers)
    .delete('/:id', deleteUser)

module.exports = router 