import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";

const args = {
  serviceKey: import.meta.env.VITE_SERVICE_KEY,
  returnType: "json",
  numOfRows: "100",
  pageNo: "1",
  ver: "1.0",
};

export const dustApi = createApi({
  reducerPath: "dustApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    paramsSerializer: (params) => qs.stringify(params, { encode: false }),
  }),
  endpoints: (builder) => ({
    getDusts: builder.query({
      query: (sidoName) => {
        return {
          url: "",
          params: { ...args, sidoName },
        };
      },
      transformResponse: (responseData) => {
        return responseData["response"]["body"]["items"];
      },
    }),

    getMultipleDusts: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const result = await _arg.reduce(async (promise, sidoName) => {
          const argResult = await fetchWithBQ({
            url: "",
            params: { ...args, sidoName: sidoName },
          });

          if (argResult.error) return { error: argResult.error };

          const promiseData = await promise.then();
          return Promise.resolve([
            ...promiseData,
            ...argResult.data["response"]["body"]["items"],
          ]);
        }, Promise.resolve([]));
        return result.error ? { error: result.error } : { data: result };
      },
    }),
  }),
});

export const { useGetDustsQuery, useGetMultipleDustsQuery } = dustApi;
