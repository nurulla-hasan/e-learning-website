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
                    url: "/enrolled-courses/my-courses",
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


        // GET COURSE BY ID WITHOUT AUTH
        getCourseById: builder.query({
            query: (id) => ({
                url: `/courses/${id}`,
                method: "GET",
            }),
            providesTags: ["COURSE"],
        }),

        // GET COURSE BY ID WITH AUTH
        getCourseByIdWithAuth: builder.query({
            query: (id) => ({
                url: `/courses/details/${id}`,
                method: "GET",
            }),
            providesTags: ["COURSE"],
        }),

        // GET ENROLLED COURSE BY ID
        getEnrolledCourseById: builder.query({
            query: (id) => ({
                url: `/enrolled-courses/my-courses/${id}`,
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

        // GET MY TRAININGS REQUEST
        getMyTrainingsRequest: builder.query({
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
                    url: "/in-person-trainings/my-requests",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["COURSE"],
        }),

        // GET ACCEPTED TRAINING REQUEST
        getAcceptedTrainingsRequest: builder.query({
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
                    url: "/in-person-trainings/my-trainings",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["COURSE"],
        }),

        // GET POPULAR COURSES
        getPopularCourses: builder.query({
            query: () => ({
                url: "/courses/popular-courses",
                method: "GET",
            }),
            providesTags: ["COURSE"],
        }),

        // GET TOP REVIEWS
        getTopReviews: builder.query({
            query: () => ({
                url: "/reviews/top-reviews",
                method: "GET",
            }),
            providesTags: ["REVIEW"],
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

        // REQUEST FOR TRAINING
        requestForTraining: builder.mutation({
            query: (data) => ({
                url: "/in-person-trainings",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["COURSE"],
        }),

    })
})

export const {
    useGetCategoriesQuery,
    useGetCoursesQuery,
    useGetMyCoursesQuery,
    useGetCourseReviewsQuery,
    useGetCourseByIdQuery,
    useGetCourseByIdWithAuthQuery,
    useGetEnrolledCourseByIdQuery,
    useGetBookmarkedCoursesQuery,
    useGetMyTrainingsRequestQuery,
    useGetAcceptedTrainingsRequestQuery,
    useGetPopularCoursesQuery,
    useGetTopReviewsQuery,
    useAddToBookmarkMutation,
    useRemoveFromBookmarkMutation,
    useRequestForTrainingMutation,
} = recipeApi