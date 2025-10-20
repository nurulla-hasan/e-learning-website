import { baseApi } from "../baseApi";
import { setCartLength } from "./cartSlice";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET CART ITEMS
    getCart: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
            Object.entries(args).forEach(([key, value]) => {
                if (value) {
                    params.append(key, value as string);
                }
            });
        }
        return {
            url: "/carts",
            method: "GET",
            params,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCartLength(result?.data?.data?.length));
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      },
      providesTags: ["CART"],
    }),

    //============================================

    // POST CART
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/carts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CART"],
    }),

    // DELETE CART
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CART"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
