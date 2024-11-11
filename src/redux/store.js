import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import { articlesApiSlice } from '../entities/Article/articlesApiSlice';
import { userApiSlice } from '../entities/User/userApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [articlesApiSlice.reducerPath]: articlesApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApiSlice.middleware).concat(userApiSlice.middleware),
});
