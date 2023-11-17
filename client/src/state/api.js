import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from 'react-redux';

const SetBaseUrl = () => {
  const baseUrl = useSelector((state) => state.global.baseUrl);
  return (baseUrl);
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: localStorage.getItem("baseUrl") || <SetBaseUrl /> }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "SingleCustomer",
    "SingleRide",
    "SharedRides",
    "RapidRides",
    "LiveRides",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `admin/users/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: (role) => `admin/users?role=${role}`,
      providesTags: ["Customers"],
    }),
    getSingleCustomer: build.query({
      query: (id) => `admin/users/${id}`,
      providesTags: ["SingleCustomer"],
    }),
    getSingleRide: build.query({
      query: ({ id, type }) => {
        return {
          url: type === "sharedExpress" ? `admin/shared-rides/${id}` : `admin/rapid-rides/${id}`,
          method: "GET",
        }
      },
      providesTags: ["SingleRide"],
    }),
    getSharedRides: build.query({
      query: ({ page = 0, pageSize = 0, sort = 0, search = "a" }) => `admin/shared-rides`,
      providesTags: ["SharedRides"],
    }),
    getRapidRides: build.query({
      query: ({ page = 0, pageSize = 0, sort = 0, search = "a" }) => `admin/rapid-rides`,
      providesTags: ["RapidRides"],
    }),
    getLiveRides: build.query({
      query: () => `admin/active-rides`,
      providesTags: ["LiveRides"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "admin/fares",
        method: "GET",
        // params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetSingleCustomerQuery,
  useGetSingleRideQuery,
  useGetSharedRidesQuery,
  useGetRapidRidesQuery,
  useGetLiveRidesQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
