import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import {UserIdStatus, UserReducer, UserStatus} from './reducers'

const MyStore = configureStore({
    reducer : {
        UserReducer : UserReducer,
        UserStatus : UserStatus,
        UserId : UserIdStatus
    }
},composeWithDevTools())

export default MyStore;