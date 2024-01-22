import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: localStorage.getItem('baseUrl'),
  credentials: 'include',
  mode: 'cors',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);

  if (result?.error?.status === 403 || result?.error?.status === 401) {
    console.log('sending refresh token');

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    console.log(refreshResult.error.data.message);

    if (refreshResult?.data) {
      localStorage.setItem('token', refreshResult?.data?.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('Error occured using refresh token');

      // dispatch(setAuthToken(null));
      // localStorage.removeItem("token");
      // localStorage.removeItem("baseUrl");
      // localStorage.removeItem("roles");
      // localStorage.removeItem("fullName");
      // navigate("/login");
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'adminApi',
  tagTypes: [
    'User',
    'Products',
    'Customers',
    'SingleCustomer',
    'Tests',
    'SingleTest',
    'Posts',
    'SinglePost',
    'Discount',
    'Dashboard',
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: ['User'],
    }),
    getCustomers: build.query({
      query: (roleForPage) => {
        return {
          url: `/admin/users?role=${roleForPage}`,
          method: 'GET',
        };
      },
      providesTags: ['Customers'],
    }),
    getSingleCustomer: build.query({
      query: (id) => `/admin/user/${id}`,
      providesTags: ['SingleCustomer'],
    }),
    getTests: build.query({
      query: () => {
        return {
          url: `/admin/tests`,
          method: 'GET',
        };
      },
      providesTags: ['Tests'],
    }),
    getSingleTest: build.query({
      query: (id) => `/admin/test/${id}`,
      providesTags: ['SingleTest'],
    }),
    getPosts: build.query({
      query: () => {
        return {
          url: `/admin/posts`,
          method: 'GET',
        };
      },
      providesTags: ['Posts'],
    }),
    getSinglePost: build.query({
      query: (id) => `/admin/post/${id}`,
      providesTags: ['SinglePost'],
    }),

    deletePost: build.mutation({
      query: (testId) => ({
        url: `admin/post/${testId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Documents', 'SingleCustomer'],
    }),
    deleteTest: build.mutation({
      query: (testId) => ({
        url: `admin/job/${testId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Documents', 'SingleCustomer'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetSingleCustomerQuery,
  useGetTestsQuery,
  useGetSingleTestQuery,
  useGetPostsQuery,
  useGetSinglePostQuery,
  useDeletePostMutation,
  useDeleteTestMutation,
} = api;
