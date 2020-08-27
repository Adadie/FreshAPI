import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

require ('dotenv/config');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Import routes
import postRoute from './routes/posts';
//const commentRoute = require('./routes/comment');
import userRoute from './routes/users';
import messageRoute from './routes/messages';

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
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Running on port ${port}`)
);
module.exports = app;
