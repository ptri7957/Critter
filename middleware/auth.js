const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
    try {
        // Get token from request header and validate
        const token = req.header('x-auth-token');
        if(!token){
            return res.status(401).json({
                errors: [
                    {
                        msg: 'User not authenticated'
                    }
                ]
            })
        }

        // Decode the token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Set req.user to the decoded payload
        req.user = decoded.user;

        // Proceed to next middleware
        next();
        
    } catch (e) {
        return res.status(401).json({
            errors: [
                {
                    msg: 'Invalid token'
                }
            ]
        })
    }
}