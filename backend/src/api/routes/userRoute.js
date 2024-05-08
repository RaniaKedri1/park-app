const express = require('express');
const { register, login, getAllUsers, deleteUser, getUser } = require('../controllers/userController');
// const authMiddleware = require('../middlewars/authMiddlewares')
const router = express.Router();

router.
    post('/register', register)
    .post('/login', login)
    .get('/', getAllUsers)
    .get('/:id', getUser)
    .delete('/:id', deleteUser)

module.exports = router 