const jwt = require('../utils/jwt.js')

const isAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1] || req.headers.authorization

        if (!token) {
            return res.status(201).json({message: "Invalid Token"})

        }
        const user = jwt.verify(token)
        req.user = user

        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    isAuth,
}