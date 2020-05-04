import React, { useState } from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event)=>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event)=>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event)=>{
        event.preventDefault();//이걸 쓰지 않으면 page가 클릭시마다 
        //refresh되어서 그 후의 작업을 할 수 없게 됨

        let body = {
            email :Email,
            password : Password
        }

        dispatch(loginUser(body))
        .then(response =>{
            if(response.payload.loginSuccess){
                props.history.push('/');
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
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;