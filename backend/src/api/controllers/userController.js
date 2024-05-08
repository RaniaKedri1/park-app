const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isValidEmail } = require('../../middleware/userValidation');


// @desc    Register a new user
// @route   POST /api/v1/auth/register
const register = async (req, res) => {
    try {
        const { email,
            password,
            repeatPassword,
            firstname,
            lastName,
            address,
            Tel,
            pays,
            city,
            postalCode,
            role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ msg: 'you have already registred' })
        if (!isValidEmail(email)) {
            return res.status(400).json({ msg: 'Invalid email address format.' });
        }
        if (password.length < 8 || !/[A-Z]/.test(password)) {
            return res.status(400)
                .json({
                    msg: 'Password at least 8 characters long, and contain at least one capital letter.'
                });
        }
        // Check if passwords match
        if (password !== repeatPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'Passwords do not match.'
            });
        }
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstname, lastName, email, password: hashedPassword, address, role, Tel, pays, city, postalCode })
        return res.status(201).json({
            status: 'success',
            data: {
                user: user,
            }
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// @desc    Login an existing user
// @route   POST /api/user/login
const login = async (req, res) => {
    const { email, password } = req.body;

    // check if the user exists in the database
    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'Email not exist!'
        });
    }

    // compare passwords - bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            status: 'error',
            message: 'Email or Password not matched!'
        });
    }

    // create a token and send it to the client
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.json({
        status: "success",
        result: {
            token: token,
            userId: user._id,
            role: user.role
        },
        message: "Logged In Successfully"
    });

};

// @desc    Fetch all users
// @route   GET /api/user/
// @access  Public
const getAllUsers = async (req, res) => {
    try {
        const user = await User.find().select('-password')
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: `something went wrong` })
    }
}


const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: `something went wrong` })
    }
}

// @desc    Delete single user by id
// @route   DELETE /api/user/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({ msg: 'user removed' })
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: `something went wrong` })
    }
}


module.exports = { register, login, getAllUsers, deleteUser, getUser }