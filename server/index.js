const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const config = require('./config/key');

const {User} = require('./models/User');

const con = mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology:true,
        useCreateIndex:true, useFindAndModify:false
    }
    ).then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

//application/x-www-form... 분석
app.use(bodyParser.urlencoded({extended:true}))
//json 분석
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World'))

app.post('/register', (req, res)=>{
    //회원가입시 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어줌
    const user = new User(req.body)
    user.save((err, userInfo)=>{
        if(err) return res.json({success:false, err})
        res.status(200).json({success:true})
    })
})

app.listen(80, ()=> console.log("Server is connected..."))