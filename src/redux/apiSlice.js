import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'https://blog-platform.kata.academy/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ page = 1, limit = 5 }) => `/articles?limit=${limit}&offset=${(page - 1) * limit}`,
    }),
    getArticleBySlug: builder.query({
      query: (slug) => `/articles/${slug}`,
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleBySlugQuery } = apiSlice;
