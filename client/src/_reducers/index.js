import {combineReducers} from 'redux';
import user from './user_reducer';
const rootReducer = combineReducers({ //reducer들을 하나로 합침
    user,
})

export default rootReducer;