import {createAction} from "@reduxjs/toolkit"
import { GetUser } from "../Helpers/GetUser"
const LOGIN_USER_INFO = 'user/login'
const GetUserAction = createAction(LOGIN_USER_INFO)
const AUTHENTICATE_USER = '/user/auth'
const AuthenticateUserAction = createAction(AUTHENTICATE_USER)
const USER_ID = 'user/id'
const UpdateUserId = createAction(USER_ID)

const LoginUser = async (data,dispatch) => {
    const Val = GetUser();
    const Obj = {
        info : Val,
        valid : data.valid
    }
    console.log(Obj)
    dispatch(GetUserAction(Obj))
    return Obj
}

const LoggedIn = (dispatch) => {
    let flag = false;
    if(GetUser()!=null) flag = true;
    dispatch(AuthenticateUserAction())
}

const UserId = (dispatch) => {
    dispatch(UpdateUserId())
}

export {LoginUser,GetUserAction,LoggedIn,AuthenticateUserAction,UserId,UpdateUserId}
