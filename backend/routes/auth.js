const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body,validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
var jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');


const JWT_SECRET = "shhhhhhh"
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

        var authToken = jwt.sign({ id: user.id }, JWT_SECRET);
        res.json(authToken);
      } catch (error) {
        if (error.code === 11000) {
          // Duplicate key error
          return res.status(400).json({ error: 'Email already exists' });
        }
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
})



//login user "api/auth/login "
router.post('/login',[
        body('email', "Enter a valid Email").isEmail(),
        body('password', 'Not empty').exists(),
    ],async (req,res)=>{

      //Email Password Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {email,password} = req.body;

      try{
        let user = await User.findOne({email});

        if(!user){
          return res.status(400).json({error:"Wrong credentials"})
        }

        const passwordCompare = await bcryptjs.compare(password,user.password);

        if(!passwordCompare){
          return res.status(400).json({error:"Wrong credentials"});
        }

        const data = {
          user:{
            id:user.id
          }
        }

        const authToken = jwt.sign(data,JWT_SECRET);
        res.json({authToken});
        
      }catch(error){
        res.status(500).json({error:"Internal error occurred"})
      }

    }

  );

// get logged in user details using post "/api/auth/getUser"
  router.post('/getUser',fetchUser,async (req,res)=>{
    try{
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch(error){
      res.status(500).json({error:"Internal error occurred"})
    }

  }

  );

module.exports = router;