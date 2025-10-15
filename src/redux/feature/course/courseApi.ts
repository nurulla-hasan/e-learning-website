import { id } from "date-fns/locale";
import { baseApi } from "../baseApi";


const recipeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL CATEGORIES
        getCategories: builder.query({
            query: () => ({
                url: "/categories",
                method: "GET",
            }),
            providesTags: ["CATEGORY"],
        }),

        // GET ALL COURSES
        getCourses: builder.query({
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
                    url: "/courses",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["COURSE"],
        }),

        // GET MY COURSES
        getMyCourses: builder.query({
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
                    url: "/my_all_recipe",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["COURSE"],
        }),

        // GET COURSE REVIEWS
        getCourseReviews: builder.query({
            query: ({ id, ...args }) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.entries(args).forEach(([key, value]) => {
                        if (value) {
                            params.append(key, value as string);
                        }
                    });
                }
                return {
                    url: `/reviews/get/${id}`,
                    method: "GET",
                    params,
                };
            },
            providesTags: ["REVIEW"],
        }),


        // GET COURSE BY ID
        getCourseById: builder.query({
            query: (id) => ({
                url: `/courses/${id}`,
                method: "GET",
            }),
            providesTags: ["COURSE"],
        }),

        // GET BOOKMARKED COURSES
        getBookmarkedCourses: builder.query({
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
                    url: "/favorite-courses",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["COURSE"],
        }),

        // ===================================END GET QUERY============================================

        // ===================================START MUTATION===========================================

        // ADD TO BOOKMARK
        addToBookmark: builder.mutation({
            query: (data) => ({
                url: "/favorite-courses",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["COURSE"],
        }),

        // REMOVE FROM BOOKMARK
        removeFromBookmark: builder.mutation({
            query: (id) => ({
                url: `/favorite-courses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["COURSE"],
        }),

        // SEND REVIEW
        sendReview: builder.mutation({
            query: (data) => ({
                url: "/review/send",
                method: "POST",
                body: data
            }),
            invalidatesTags: [ "REVIEW", "COURSE"],
        }),

    })
})

export const {
    useGetCategoriesQuery,
    useGetCoursesQuery,
    useGetMyCoursesQuery,
    useGetCourseReviewsQuery,
    useGetCourseByIdQuery,
    useGetBookmarkedCoursesQuery,
    useAddToBookmarkMutation,
    useRemoveFromBookmarkMutation,
    useSendReviewMutation,
} = recipeApi