import {
    LOGIN_USER
} from '../_actions/types'


export default function(state={}, action){
    switch(action){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            //... =>그대로 사용

        default:
            return state;
    }
}