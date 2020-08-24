const express = require('express');

const router = express.Router();
const Post = require('../models/postmodel');
//const Comment = require('../models/commentmodel');
const verify = require('./verifytoken');
const {postvalidation} = require('../Validations/postvalidations');
const {commentvalidation} = require('../Validations/commentvalidation');

//Submit Posts
router.post('/',verify, (req, res)=>{
    
    //Validate post before submitting
    const {error} = postvalidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    //Create new post
    const post = new Post({
        Author_names: req.body.Author_names,
        Title: req.body.Title,
        Content: req.body.Content
    });
    post.save()
    .then(data => {
        res.json({data, id:req.user._id});
    })
    .catch(err=>{
        res.json({message: err});
    });
});

//Get back all posts

router.get('/',verify, async (req, res)=> {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
});

//Get Specific Post
router.get('/:postId',verify, async (req, res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
});
 
//Delete Post
router.delete('/Delete',verify, async (req,res)=>{
    try{
        const deletedPost= await Post.remove({_id: req.user._id});
        res.json('Successfully Deleted Post');
    }catch(err){
        res.json({message: err});
    }

//Update posts
router.patch('/:postId',verify, async (req,res)=>{

    //Validate register before updating
    const {error} = postvalidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    try{
        const updatedPost= await Post.updateOne({_id: req.params.postId}, {$set: {Author_names: req.body.Author_names,
            Title: req.body.Title,
            Content: req.body.Content}});
        res.json('Successfully Updated Post');
    }catch(err){
        res.json({message: err});
    }
});

//Commenting
router.post('/comment',verify, (req, res)=>{

    //Validate message before submitting
    const {error} = commentvalidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const comment = new Comment({
        Comments: req.body.Comments
    });
    comment.save()
    .then(data => {
        res.json(data);
    })
    .catch(err=>{
        res.json({message: err});
    });
});
});

module.exports = router;