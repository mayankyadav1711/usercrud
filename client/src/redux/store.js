// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import studentsReducer from './studentSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
  },
});

export default store;
