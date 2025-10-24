
import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // MAKE PAYMENT
        makePayment: builder.mutation({
            query: (data) => ({
                url: "/payments/authorize-payment",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["CHECKOUT"],
        }),

    })
})

export const {
    useMakePaymentMutation,
} = paymentApi