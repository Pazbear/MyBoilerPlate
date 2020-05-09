import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'; //없으면 문제 생길수 있음

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event)=>{
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event=>{
        setName(event.currentTarget.value)
    })

    const onPasswordHandler = (event)=>{
        setPassword(event.currentTarget.value)
    }
    
    const onConfirmPasswordHandler = (event)=>{
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event)=>{
        event.preventDefault();//이걸 쓰지 않으면 page가 클릭시마다 
        //refresh되어서 그 후의 작업을 할 수 없게 됨


        if(Password !== ConfirmPassword){
            return alert('비밀번호가 같지 않음')
        }

        let body = {
            email :Email,
            name : Name,
            password : Password
        }



        dispatch(registerUser(body))
        .then(response =>{
            if(response.payload.success){
                props.history.push('/login')
            }else{
                alert('회원가입 실패')
            }
        })

    }


    return (
        <div style={{ display:'flex', justifyContent:'center',alignItems:'center',
        width:'100%', height:'100vh'}}>
            <form style={{display:'flex', flexDirection:"column"}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <label>ConfirmPassword</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

                <br/>
                <button type='submit'>
                    Register
                </button>
            </form>
        </div>
    );
}

export default withRouter(RegisterPage)