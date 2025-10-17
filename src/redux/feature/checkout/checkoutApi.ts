import { baseApi } from "../baseApi";

const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET CHECKOUT
    getCheckout: builder.query({
      query: () => ({
        url: "/checkouts",
        method: "GET",
      }),
      providesTags: ["CHECKOUT"],
    }),

    //============================================

    // POST CHECKOUT
    addToCheckout: builder.mutation({
      query: (data) => ({
        url: "/checkouts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CHECKOUT"],
    }),

    // DELETE CHECKOUT
    removeFromCheckout: builder.mutation({
      query: (id) => ({
        url: `/checkouts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CHECKOUT"],
    }),
  }),
});

export const {
  useGetCheckoutQuery,
  useAddToCheckoutMutation,
  useRemoveFromCheckoutMutation,
} = checkoutApi;
