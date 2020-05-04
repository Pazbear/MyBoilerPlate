const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10; 
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    role:{
        type:Number,
        default: 0
    },
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

userSchema.pre('save', function(next){//패스워드 암호화
    var user = this
    if(user.isModified('password')){//패스워드 변경시에만
        //비밀번호 암호화(bcrypt)
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                //hash -> 암호화된 비밀번호
                if(err) return next(err)
                // Store hash in your password DB.
                user.password = hash
                next()
            });
        });
    } else{
        next();
    }

})

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}
//methods는 사용시에 모델 변수 정의 후 변수에 사용가능
userSchema.methods.generateToken = function(cb){
    var user = this

    //jsonwebtoken을 이용해 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    //toHexString() - 필요
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

//statics 은 사용시에 변수 없이 모델 자체에 함수 붙이기 가능
userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해 유저를 찾은 후
        //클라이언트에서 가져온 token 과 db에 보관된 토큰이 일치하는 지 확인

        user.findOne({"_id":decoded, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}