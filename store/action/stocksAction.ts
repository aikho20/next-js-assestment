import { apiSlice } from "@/lib/config/apiSlice";

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanySearch: builder.mutation({
      query: ({ symbol }: { symbol: string }) => ({
        url: `api/v3/search?query=${symbol}&limit=5&apikey=${process.env.FINANCIAL_MODEL_API_KEY}`,
      }),
    }),
    getStocksDetails: builder.mutation({
      query: ({ symbol }: { symbol: string }) => ({
        url: `api/v3/profile/${symbol}?apikey=${process.env.FINANCIAL_MODEL_API_KEY}`,
        method: "GET",
      }),
    }),

    getStockValue: builder.mutation({
      query: ({
        symbol,
        from,
        to,
      }: {
        symbol: string;
        from: string;
        to: string;
      }) => ({
        url: `api/v3/historical-price-full/${symbol}?from=${from}&to=${to}&apikey=${process.env.FINANCIAL_MODEL_API_KEY}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCompanySearchMutation,
  useGetStocksDetailsMutation,
  useGetStockValueMutation,
} = accountApi;
