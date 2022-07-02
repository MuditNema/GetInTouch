import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import {UserIdStatus, UserReducer, UserStatus, UserFilterInfo} from './reducers'

const MyStore = configureStore({
    reducer : {
        UserReducer : UserReducer,
        UserStatus : UserStatus,
        UserId : UserIdStatus,
        UserFilter : UserFilterInfo
    }
},composeWithDevTools())

export default MyStore;