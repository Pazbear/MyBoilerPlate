const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



const config = require('./config/key');

const {auth} = require('./middleware/auth')
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
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World'))

app.post('/api/user/register', (req, res)=>{
    //회원가입시 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어줌
    const user = new User(req.body)
    user.save((err, userInfo)=>{
        if(err) return res.json({success:false, err})
        res.status(200).json({success:true})
    })
})

app.post('/api/user/login', (req, res)=>{
    //요청된 이메일을 데이터베이스에서 찾음
    User.findOne({email: req.body.email}, (err, user)=>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message:"이메일 없음"
            })
        }
        //있다면 비밀번호가 같은지 확인
    user.comparePassword(req.body.password, (err, isMatch)=>{
        if(!isMatch)
        return res.json({loginSuccess: false, message:"비밀번호 오류"})
        //비밀번호까지 같다면 토큰생성
        user.generateToken((err, user)=>{
            if(err) res.status(400).send(err)

            //토큰을 저장(쿠키, 로컬스토리지)
            res.cookie("x_auth", user.token)
            .status(200).json({loginSuccess:true, userId:user._id})
        })
    })
    })
    
})

app.get('/api/user/auth', auth, (req, res)=>{
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth:true,
        name : req.user.name,
        email:req.user.email,
        role: req.user.role
    })
})

app.get('/api/user/logout',auth, (req, res)=>{
    User.findOneAndUpdate({_id:req.user._id},
        {token: ""}, (err, user)=>{
            if(err) return res.json({success:false, err});
            return res.status(200).send({
                success:true
            })
        })
})

app.listen(5000, ()=> console.log("Server is connected..."))