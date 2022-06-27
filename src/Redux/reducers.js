import {  createReducer } from '@reduxjs/toolkit'
import { GetUser } from '../Helpers/GetUser'
import {AuthenticateUserAction, GetUserAction}  from "./actions" 

const UserCredentials = GetUser();
export const UserReducer = createReducer(UserCredentials,(builder) => {
    builder.addCase(GetUserAction , (state,action) => {
        console.log(UserCredentials)
        if(action.payload.valid){
            return action.payload.info;
        }
        return state;
    })
})

const AuthState = GetUser()==null?false:true;
export const UserStatus = createReducer(AuthState,(builder)=>{
    builder.addCase(AuthenticateUserAction,(state,action)=>{
        if(GetUser()!=null) return true;
        else return false;
    })
})
