import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: [
    "Patients",
    "PatientData",
    "Transactions",
  ],
  endpoints: (build) => ({
    getPatients: build.query({
      query: () => `/api/fetchAll`,
      providesTags: ["Patients"],
    }),
    createPatientData: build.mutation({
      query: (body) => ({
        url: "/api/intake",
        method: "POST",
        body: body
      }),
      invalidatesTags: ["PatientData"],
    }),
    sendPatientData: build.mutation({
      query: (body) => ({
        url: "/api/addToDb",
        method: "POST",
        body: body
      }),
      invalidatesTags: ["PatientData"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useCreatePatientDataMutation,
  useSendPatientDataMutation,
  useGetTransactionsQuery,
} = api;
