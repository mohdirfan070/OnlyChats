const jwt = require('jsonwebtoken');

const generateToken = async(user) => {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: '72h'
    });
}

module.exports = {generateToken};