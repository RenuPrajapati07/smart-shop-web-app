import { combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from './slice/authSlice';
import cartSlice from './slice/cartSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartSlice,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store;