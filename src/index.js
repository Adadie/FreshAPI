import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//CORS Headers
app.use((res, req, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method =='OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET, POST, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});
//Import routes
import postRoute from './routes/posts.js';
//const commentRoute = require('./routes/comment');
import userRoute from './routes/users.js'
import messageRoute from './routes/messages.js';

//connecting mongodb
console.log(process.env.DB_CONNECTION);
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if (err){
            console.log(err);
        }
        else{
            console.log("conected to mongodb");
        }
    });


app.use('/posts', postRoute);
//app.use('/comment', commentRoute);
app.use('/users', userRoute);
app.use('/messages', messageRoute);

//ROUTES
app.get('/', (req, res)=>{
    res.status(200).send('Hello Rwanda')
});

//Listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`)
);
//module.exports = app;
export default app;
