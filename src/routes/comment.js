// const express = require('express');

// const router = express.Router();
// const Comment = require('../models/commentmodel');
// const verify = require('./verifytoken');
// const {commentvalidation} = require('../Validations/commentvalidation');

// //Commenting
// router.post('/',verify, (req, res)=>{

//     //Validate message before submitting
//     const {error} = commentvalidation(req.body);
//     if(error) {
//         return res.status(400).send(error.details[0].message);
//     }

//     const comment = new Comment({
//         Comments: req.body.Comments
//     });
//     comment.save()
//     .then(data => {
//         res.json(data);
//     })
//     .catch(err=>{
//         res.json({message: err});
//     });
// });