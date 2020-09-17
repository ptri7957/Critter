const express = require("express");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(user){
            return res.json(user);
        }else{
            return res.status(400).json({ msg: 'User not found or authenticated' });
        }
        
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.post(
  "/",
  [
    check("email", "Email cannot be empty").not().isEmpty(),
    check("password", "Password cannot be empty").not().isEmpty(),
  ],
  async (req, res) => {
    // Validate input fields
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      // Find user
      const user = await User.findOne({ email: email });

      // Check if user has account
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "User does not exist",
            },
          ],
        });
      }

      await bcrypt.compare(password, user.password, (err, result) => {
        if(err){
            throw err;
        }

        if (result) {
          const payload = {
            user: {
              id: user.id,
              username: user.username,
            },
          };

          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (error, token) => {
              if (!error) {
                return res.json({ token });
              } else {
                throw error;
              }
            }
          );
        }
      });
    } catch (e) {
        return res.status(500).json({
            errors: [
                {
                    msg: 'Server Error'
                }
            ]
        });
    }
  }
);

module.exports = router;
