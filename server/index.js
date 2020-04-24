const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('./config/key');

const con = mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology:true,
        useCreateIndex:true, useFindAndModify:false
    }
    ).then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World'))

app.listen(80, ()=> console.log("Server is connected..."))