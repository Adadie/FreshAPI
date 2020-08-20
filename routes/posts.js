const express = require('express');

const router = express.Router();
const Post = require('../models/postmodel');
const verify = require('./verifytoken');


//Submit Posts
router.post('/',verify, (req, res)=>{
    const post = new Post({
        Author_names: req.body.Author_names,
        Title: req.body.Title,
        Content: req.body.Content
    });
    post.save()
    .then(data => {
        res.json(data);
    })
    .catch(err=>{
        res.json({message: err});
    });
});

//Get back all posts

router.get('/', async (req, res)=> {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
});

//Get Specific Post
router.get('/:postId', verify, async (req, res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
});
 
//Delete Post
router.delete('/:postId', async (req,res)=>{
    try{
        const deletedPost= await Post.remove({_id: req.params.postId});
        res.json(deletedPost);
    }catch(err){
        res.json({message: err});
    }
});

//Update posts
router.patch('/:postId', async (req,res)=>{
    try{
        const updatedPost= await Post.updateOne({_id: req.params.postId}, {$set: {Author_names: req.body.Author_names,
            Title: req.body.Title,
            Content: req.body.Content}});
        res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;