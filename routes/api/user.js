const express = require('express');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("../../middleware/auth");

// Import the User model
const User = require('../../models/User');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.json(user);
    } catch (error) {
        return res.status(500).json({
            errors: [
                {
                    msg: 'Server Error'
                }
            ]
        });
    }
});

router.post('/', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email must be in a valid format').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { username, email, password } = req.body;
    try{

        let newUser = await User.findOne({email: email});
        if(newUser){
            return res.status(400).json({
                errors: [
                    {
                        msg: 'User already registered'
                    }
                ]
            });
        }

        const hash = await bcrypt.hash(password, 10);
        
        newUser = new User({
            username: username,
            email: email,
            password: hash
        });

        await newUser.save();

        // Create payload for jwt
        const payload = {
            user: {
                id: newUser.id,
                username: newUser.username
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
                expiresIn: 360000
            },
            (error, token) => {
                if(!error){
                    return res.json({token});
                }else{
                    throw error;
                }
            }
        );

    }catch(e){
        return res.status(500).json({
            errors: [
                {
                    msg: 'Server Error'
                }
            ]
        });
    }
})

module.exports = router;