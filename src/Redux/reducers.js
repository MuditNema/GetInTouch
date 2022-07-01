import {  createReducer } from '@reduxjs/toolkit'
import { GetUser } from '../Helpers/GetUser'
import { GetUserId } from '../Helpers/GetUserId';
import {AuthenticateUserAction, GetUserAction, UpdateUserId}  from "./actions" 

const UserCredentials = GetUser();
export const UserReducer = createReducer(UserCredentials,(builder) => {
    builder.addCase(GetUserAction , (state,action) => {
        console.log(UserCredentials)
        return action.payload.info
    })
})

const AuthState = GetUser()==null?false:true;
export const UserStatus = createReducer(AuthState,(builder)=>{
    builder.addCase(AuthenticateUserAction,(state,action)=>{
        if(GetUser()!=null) return true;
        else return false;
    })
})

const UserId = GetUserId();
export const UserIdStatus = createReducer(UserId,(builder)=>{
    builder.addCase(UpdateUserId,(state,action)=>{
        return GetUserId();
    })
})
