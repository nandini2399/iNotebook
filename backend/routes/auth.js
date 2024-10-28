const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body,validationResult} = require('express-validator')

router.get('/',[
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', "Enter a valid Email").isEmail(),
        body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
    ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // const user = User(req.body);
    // user.save().catch(err=>{
    //     res.json({error:err.errmsg,msg:"Duplicate email found"});
    // });
    //res.send(req.body)

    try {
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        res.json(user);
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