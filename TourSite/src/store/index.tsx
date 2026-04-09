import { configureStore } from "@reduxjs/toolkit";
import tourReducer  from './tourSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice';

const store = configureStore({
    reducer: {
        orders: orderReducer,
        users: userReducer,
        tours: tourReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;