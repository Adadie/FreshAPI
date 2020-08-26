import express from 'express';
const router = express.Router();
import Message from '../models/messagemodel';
import verify from './verifytoken';
import {messagevalidation} from '../Validations/messagevalidation';


//Submit Message
router.post('/',verify, (req, res)=>{

    //Validate message before submitting
    const {error} = messagevalidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const message = new Message({
        Names: req.body.Names,
        Email: req.body.Email,
        Message: req.body.Message
    });
    message.save()
    .then(data => {
        res.json(data);
    })
    .catch(err=>{
        res.json({message: err});
    });
});

//Get back all messages

router.get('/',verify, async (req, res)=> {
    try{
        const messages = await Message.find();
        res.json(messages);
    }catch(err){
        res.json({message: err});
    }
});

//Get Specific Message
router.get('/:messageId', async (req, res)=>{
    try{
        const message = await Message.findById(req.params.messageId);
        res.json(message);
    }
    catch(err){
        res.json({message:err});
    }
});
 
//Delete Message
router.delete('/:messageId',verify, async (req,res)=>{
    try{
        const deletedMessage= await Message.remove({_id: req.params.messageId});
        res.json(deletedMessage);
    }catch(err){
        res.json({message: err});
    }
});

//Update Message
router.patch('/:messageId', async (req,res)=>{

    //Validate post before updating
    const {error} = messagevalidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    try{
        const updatedMessage= await Message.updateOne({_id: req.params.messageId}, {$set: {Names: req.body.Names,
            Email: req.body.Email,
            Message: req.body.Message}});
        res.json(updatedMessage);
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;