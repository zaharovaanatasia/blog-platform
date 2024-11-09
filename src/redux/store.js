import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { articlesApiSlice } from './articlesApiSlice';
import { userApiSlice } from './userApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [articlesApiSlice.reducerPath]: articlesApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApiSlice.middleware).concat(userApiSlice.middleware),
});
