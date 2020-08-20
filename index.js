const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();
app.use(bodyParser.json());

//Import routes
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');
const messageRoute = require('./routes/messages');

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

//Middleware
/*app.use('/posts', ()=>{
    console.log('MIddlewares run when the route is called');
});*/


app.use('/posts', postRoute);
app.use('/users', userRoute);
app.use('/messages', messageRoute);

//ROUTES
app.get('/', (req, res)=>{
    res.send('Hello Rwanda')
});

//Listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Running on port ${port}`)
);