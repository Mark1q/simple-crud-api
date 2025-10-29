const User = require('./../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./../config.js')

const registerUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({error: "User not found"})

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({error: "Invalid credentials"})

        const token = jwt.sign({ userId: user._id }, config.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
        res.json({token})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    registerUser,
    loginUser
}