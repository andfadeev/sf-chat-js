import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import chatReducer from '../chatSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        chat: chatReducer
    },
});
