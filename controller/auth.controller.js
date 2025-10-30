const User = require('./../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./../config.js');
const tokens = require('../utils/tokens.js')
const cookie = require('../utils/cookie.js')

const generateTokens = (userId, userRole) => {
    const accessToken = jwt.sign(
      { userId: userId, role: userRole},
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: tokens.ACCESS_TOKEN_EXPIRES }
    );

    const refreshToken = jwt.sign(
      { userId: userId },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: tokens.REFRESH_TOKEN_EXPIRES }
    );

    return { accessToken, refreshToken };
}


const registerUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({error: "User not found"})

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({error: "Invalid credentials"})

        const { accessToken, refreshToken } = generateTokens(user._id, user.role);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: cookie.COOKIE_EXPIRES_MS
        })

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const logoutUser = async (req, res) => {
    
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    
    res.status(200).json({ message: 'Logged out successfully' });
};

const refreshToken = async (req, res) => {
    const token = await req.cookies.refreshToken;

    if (!token) return res.status(401).json({ error: 'Refresh token not found' }); 

   try {
        const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
        
        // Generate new access token
        const accessToken = jwt.sign(
            { userId: decoded.userId, userRole: decoded.role },
            config.ACCESS_TOKEN_SECRET,
            { expiresIn: tokens.ACCESS_TOKEN_EXPIRES }
        );
        
        res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(403).json({ error: 'Invalid refresh token' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
}