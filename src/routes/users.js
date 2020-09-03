import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verify from './verifytoken.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
import User from '../models/usermodel.js';
import {regvalidation, loginvalidation} from '../Validations/uservalidation.js';
//import loginvalidation from '../Validations/uservalidation.js';

//Register User
router.post('/', async (req, res)=>{
 
//Validate register before submitting
    const {error} = regvalidation(req.body);
    if(error) {
        return res.status(400).json({err:error.details[0].message});
    }

//Checking If email already exists
     const emailExist = await User.findOne({Email:req.body.Email});
    if(emailExist){ 
         return res.status(400).json({message: 'Email already exists'});
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
res.header('auth-token', token).send({token});

});


//Get back all Users

router.get('/',verify, async (req, res)=> {
    try{
        const users = await User.find();
        // data = users({
        //     Fname: req.body.Fname,
        //     Lname: req.body.Lname
        // });
        res.json(users);
    }catch(err){
        res.json({message: err});
    }
});

//Get Specific User
router.get('/:userId',verify, async (req, res)=>{
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    }
    catch(err){
        res.send({message:err});
    }
});
 
//Delete User
router.delete('/:userId',verify, async (req,res)=>{
    try{
        const deletedUser= await User.remove({_id: req.user._id});
        res.json('Succesfully deleted');
    }catch(err){
        res.json({message: err});
    }
});

//Update user
router.patch('/update', verify, async (req,res)=>{
    //Validate register before submitting
    const {error} = regvalidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

//Hashing Password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.Password, salt);
    try{
        const updatedUser= await User.updateOne({_id: req.user._id}, {$set: {Fname: req.body.Fname,
            Lname: req.body.Lname,
            Email: req.body.Email,
            Password: req.body.Password}});
        res.json('Succesfully updated User');
    }catch(err){
        res.json({message: err});
    }
});

export default router;
