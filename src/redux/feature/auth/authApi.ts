import { ErrorToast, SuccessToast } from "@/lib/utils";
import { SetAccessToken } from "../auth/authSlice";
import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        // Login Endpoint (Mutation) 
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const accessToken = data?.data?.accessToken;
                    const user = data?.data;

                    if (!accessToken || !user) {
                        ErrorToast("Invalid login response.");
                        return;
                    }

                    if (user?.role !== "STUDENT" && user?.role !== "COMPANY") {
                        ErrorToast("You are not authorized to login.");
                        return;
                    }

                    // Set access token first
                    localStorage.setItem("accessToken", accessToken);
                    dispatch(SetAccessToken(accessToken));
                    SuccessToast("Login successful.");
                } catch (error: any) {
                    ErrorToast(error?.error?.data?.message || error?.message || "Login failed.");
                }
            },
        }),

        // Register Endpoint (Mutation)
        register: builder.mutation({
            query: (credentials) => ({
                url: "/users/register",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted({ email }, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const otpToken = data?.data || data;
                    if (otpToken) {
                        window.location.href = `/verify-otp?type=signup&email=${encodeURIComponent(email)}&otpToken=${encodeURIComponent(otpToken)}`;
                    }
                } catch (error: any) {
                    ErrorToast(error?.error?.data?.message || error?.message || "Registration failed.");
                }
            },
        }),

        // OTP VERIFY FOR SIGNUP
        verifyOTPForSignup: builder.mutation({
            query: (data) => ({
                url: '/users/verify-otp',
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    SuccessToast(data?.message);
                } catch (error: any) {
                    ErrorToast(error?.error?.data?.message || error?.message || "OTP verification failed.");
                }
            },
        }),


        // FORGET PASSWORD
        forgetPassword: builder.mutation({
            query: (email) => {
                return {
                    url: '/users/forgot-password',
                    method: 'POST',
                    body: email
                }
            },
            async onQueryStarted({ email }, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    SuccessToast("OTP sent successfully!");
                    window.location.href = `/verify-otp?type=forget-password&email=${encodeURIComponent(email)}`;
                } catch (error: any) {
                    ErrorToast(error?.error?.data?.message || error?.message || "Failed to send new OTP.");
                }
            }
        }),

        // OTP VERIFY FOR RESET PASSWORD
        verifyOTPForResetPassword: builder.mutation({
            query: (data) => ({
                url: '/users/verify-otp-forgot-password',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    SuccessToast(data?.message);
                } catch (error: any) {
                    ErrorToast(error?.error?.data?.message || error?.message || "OTP verification failed.");
                }
            },
        }),

        // RESEND SIGNUP OTP
        resendSignupOTP: builder.mutation({
            query: (email) => ({
                url: '/users/resend-verification-email',
                method: 'POST',
                body: email
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    SuccessToast(data?.message);
                } catch (error: any) {
                    ErrorToast(error?.error?.data?.message || error?.message || "Failed to send new OTP.");
                }
            },
        }),

        // RESEND RESET OTP
        resendResetOTP: builder.mutation({
            query: (email) => ({
                url: '/users/resend-otp',
                method: 'POST',
                body: email
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    SuccessToast(data?.message);
                } catch (error: any) {
                    ErrorToast(error?.error?.data?.message || error?.message || "Failed to send new OTP.");
                }
            },
        }),

        // RESET PASSWORD
        resetPassword: builder.mutation({
            query: (data) => {
                return {
                    url: `/users/update-password`,
                    method: 'POST',
                    body: data,
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    SuccessToast(data?.message);
                    localStorage.removeItem("FPE");
                    window.location.href = "/auth/login";
                } catch (error: any) {
                    ErrorToast(error?.error?.data?.message || error?.message || "Failed to reset password.");
                }
            }
        }),

        // CHANGE PASSWORD
        changePassword: builder.mutation({
            query: (data) => {
                return {
                    url: "/users/change-password",
                    method: 'PATCH',
                    body: data
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    SuccessToast(data?.message);
                } catch (error: any) {
                    ErrorToast(error?.error?.data?.message || error?.message || "Failed to change password.");
                }
            },
        }),

    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useVerifyOTPForSignupMutation,
    useVerifyOTPForResetPasswordMutation,
    useResendResetOTPMutation,
    useResendSignupOTPMutation,
    useResetPasswordMutation,
    useChangePasswordMutation
} = authApi;