import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import {UserReducer, UserStatus} from './reducers'

const MyStore = configureStore({
    reducer : {
        UserReducer : UserReducer,
        UserStatus : UserStatus
    }
},composeWithDevTools())

export default MyStore;