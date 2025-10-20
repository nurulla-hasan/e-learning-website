
import { baseApi } from "../baseApi";

const legalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ABOUT
        getAbout: builder.query({
            query: () => ({
                url: "/about-us",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        // GET TERMS
        getTerms: builder.query({
            query: () => ({
                url: "/terms-&-conditions",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        // GET PRIVACY POLICY
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: "/privacy-policy",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        // GET CONTACT
        // getContact: builder.query({
        //     query: () => ({
        //         url: "/dashboard/get-contact",
        //         method: "GET",
        //     }),
        //     providesTags: ["LEGAL"],
        // }),

        // GET FAQ
        getFaq: builder.query({
            query: () => ({
                url: "/faqs",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        // GET HELP
        getHelp: builder.query({
            query: () => ({
                url: "/help-and-support",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        //======================================================================================================
        //====================================    MUTATION    ====================================================
        //======================================================================================================

        // SEND CONTACT
        sendMessage: builder.mutation({
            query: (data) => ({
                url: "/support",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["LEGAL"],
        }),

        // SEND SUBSCRIBE
        sendSubscribe: builder.mutation({
            query: (data) => ({
                url: "/newsletter-subscriber",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["LEGAL"],
        }),
    })
})

export const {
    useGetTermsQuery,
    useGetPrivacyPolicyQuery,
    useGetFaqQuery,
    useSendMessageMutation,
    useGetHelpQuery,
    useGetAboutQuery,
    useSendSubscribeMutation,
} = legalApi