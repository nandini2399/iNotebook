const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body,validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
var jwt = require('jsonwebtoken');

//create user "api/auth/createUser "
router.post('/createUser',[
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', "Enter a valid Email").isEmail(),
        body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
    ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const salt = await bcryptjs.genSalt(10);
        const secPassword = await bcryptjs.hash(req.body.password,salt);
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPassword
        });

        var token = jwt.sign({ id: user.id }, 'shhhhh');
        res.json(token);
      } catch (error) {
        if (error.code === 11000) {
          // Duplicate key error
          return res.status(400).json({ error: 'Email already exists' });
        }
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
})

module.exports = router;