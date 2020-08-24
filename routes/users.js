const express = require('express');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const router = express.Router();
const User = require('../models/usermodel');
const {regvalidation, loginvalidation} = require('../Validations/uservalidation');

//Register User
router.post('/', async (req, res)=>{
 
//Validate register before submitting
    const {error} = regvalidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

//Checking If email already exists
     const emailExist = await User.findOne({Email:req.body.Email});
    if(emailExist){ 
         return res.status(400).send('Email already exists');
    }

//Hashing Password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.Password, salt);

//Creating new User
    const newuser = User({
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        Email: req.body.Email,
        Password: hashedPassword
    });
    const newdata= User({
        Fname: req.body.Fname,
        Lname: req.body.Lname
    });
    try{
    await newuser.save()
        res.json(newdata);
    }
    catch(err){
        res.json({message: err});
    }
});


//Logging in user
router.post('/login', async (req, res)=>{
//Validate register before loggin user in
const {error} = loginvalidation(req.body);
if(error) {
    return res.status(400).send(error.details[0].message);
}

//Checking If email exists in database
 const user = await User.findOne({Email:req.body.Email});
if(!user){ 
     return res.status(400).send('Email does not exists');
}
//Checking Password 
const validpassword = await bcrypt.compare(req.body.Password, user.Password);
if(!validpassword){
    return res.status(400).send('Heheheh...Password does not exists');
}
    // Creating Token
const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
res.header('auth-token', token).send(token);

});


//Get back all Users

router.get('/', async (req, res)=> {
    data = users({
        Fname: req.body.Fname,
        Lname: req.body.Lname
    });
    try{
        const users = await User.find();
        res.json(data);
    }catch(err){
        res.json({message: err});
    }
});

//Get Specific User
router.get('/:userId', async (req, res)=>{
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    }
    catch(err){
        res.send({message:err});
    }
});
 
//Delete User
router.delete('/:userId', async (req,res)=>{
    try{
        const deletedUser= await User.remove({_id: req.params.userId});
        res.json('Succesfully deleted');
    }catch(err){
        res.json({message: err});
    }
});

//Update user
router.patch('/:userId', async (req,res)=>{
    //Validate register before submitting
    const {error} = regvalidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

//Hashing Password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.Password, salt);
    try{
        const updatedUser= await User.updateOne({_id: req.params.userId}, {$set: {Fname: req.body.Fname,
            Lname: req.body.Lname,
            Email: req.body.Email,
            Password: req.body.Password}});
        res.json('Succesfully updated User');
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;