const {User} = require('../models/User')

let auth = (req, res, next) =>{

    //인증 처리를 하는 곳

    //클라이언트 쿠키에서 토큰 가져오기
    let token = req.cookies.x_auth;
    //cookies !!

    //토큰 복호화해 유저 찾음
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false, error:true})
        
        req.token = token
        req.user = user
        next()
    })

    //유저가 있으면 인증 o
    //없으면 x
}

module.exports = {auth}