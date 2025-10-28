import { baseApi } from "../baseApi";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return ({
      // GET ALL ATTEMPTS TESTS
      getAllAttemptsTests: builder.query({
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
            url: "/attempt-test",
            method: "GET",
            params,
          };
        },
        providesTags: ["LEARNING"],
      }),

      // GET SINGLE TEST
      getSingleTest: builder.query({
        query: (id) => ({
          url: `/tests/${id}`,
          method: "GET",
        }),
        providesTags: ["LEARNING"],
      }),

      // GET SINGLE ATTEMPT TEST
      getSingleAttemptTest: builder.query({
        query: (id: string) => ({
          url: `/attempt-test/${id}`,
          method: "GET",
        }),
        providesTags: ["LEARNING"],
      }),

      // GET CERTIFICATE TEMPLETE
      getCertificate: builder.query({
        query: (id: string) => ({
          url: `/certificates/my-certificates/${id}`,
          method: "GET",
        }),
        providesTags: ["LEARNING"],
      }),

      //============================================
      // MARK LESSON AS COMPLETED
      markLessonAsCompleted: builder.mutation({
        query: (data) => ({
          url: "/student-progress/lessons",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["LEARNING"],
      }),

      // MARK COMPLETED COURSE 
      markCourseAsCompleted: builder.mutation({
        query: (data) => ({
          url: "/student-progress/complete-course",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["LEARNING"],
      }),

      // MARK TEST AS COMPLETED
      markTestAsCompleted: builder.mutation({
        query: (data) => ({
          url: "/student-progress/tests",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["LEARNING"],
      }),

      // ATTEMPT TEST 
      attemptTest: builder.mutation({
        query: (data) => ({
          url: "/attempt-test",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["LEARNING"],
      }),
    });
  },
});

export const {
  useMarkLessonAsCompletedMutation,
  useMarkCourseAsCompletedMutation,
  useMarkTestAsCompletedMutation,
  useAttemptTestMutation,
  useGetAllAttemptsTestsQuery,
  useGetSingleAttemptTestQuery,
  useGetSingleTestQuery,
  useGetCertificateQuery,
  useLazyGetCertificateQuery,
} = lessonApi;
