import { baseApi } from "../baseApi";
import { SetUserProfile } from "./profileSlice";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET USER PROFILE
    getUserProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["PROFILE"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(SetUserProfile(data?.data));
          }
        } catch {
          // silently ignore; UI can read error from hook if needed
        }
      },
    }),

    // UPDATE USER PROFILE
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PROFILE"],
    }),

    // UPDATE USER PROFILE PICTURE
    updateProfilePicture: builder.mutation({
      query: (data) => ({
        url: "/users/update-profile-image",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PROFILE"],
    }),

    // CHANGE PASSWORD
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/users/change-password",
          method: "PUT",
          body: data,
        };
      },
      // async onQueryStarted(arg, { queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     SuccessToast(data?.message);
      //   } catch {
      //     ErrorToast("Failed to change password.");
      //   }
      // },
    }),

  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateProfilePictureMutation,
  useChangePasswordMutation,
} = profileApi;
