import { baseApi } from "../baseApi";
import { SetUserProfile } from "./profileSlice";

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET USER PROFILE
        getUserProfile: builder.query({
            query: () => ({
                url: "/auth/profile",
                method: "GET",
            }),
            providesTags: ["PROFILE"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.data) {
                        dispatch(SetUserProfile(data?.data));
                    }
                } catch (error: any) {
                    // silently ignore; UI can read error from hook if needed
                }
            },
        }),

        // UPDATE USER PROFILE
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: "/auth/edit-profile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["PROFILE"],
        }),

        // UPDATE USER PROFILE PICTURE
        updateProfilePicture: builder.mutation({
            query: (data) => ({
                url: "/auth/edit-profile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["PROFILE"],
        }),

        // GET FAVORITE RECIPES
        getUserFavoriteRecipes: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.entries(args).forEach(([key, value]) => {
                        if (value) {
                            params.append(key, String(value));
                        }
                    });
                }
                return {
                    url: "/dashboard/get_user_favorites",
                    method: "GET",
                    params,
                };
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.data) {
                        dispatch(SetUserProfile(data?.data));
                    }
                } catch (error: any) {
                    // silently ignore; UI can read error from hook if needed
                }
            },
            providesTags: ["FAVORITE"],
        }),

    })
})

export const {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useUpdateProfilePictureMutation
} = profileApi