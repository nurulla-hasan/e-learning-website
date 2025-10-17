"use client";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LearningCourseItem from "./LearningCourseItem";
import { useGetMyCoursesQuery } from "@/redux/feature/course/courseApi";
import { ILearningCourse } from "@/types/course.type";
import PageLayout from "@/tools/PageLayout";
import CustomPagination from "@/tools/CustomPagination";

const LearningCourseList = () => {
  const { currentPage, setCurrentPage, totalPages, items, isLoading, isError } =
    useSmartFetchHook<ILearningCourse>(useGetMyCoursesQuery, {limit:1});

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          {/* <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div> */}
        </div>

        {/* Course List Skeleton - Horizontal Cards */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="border rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row gap-0">
                  {/* Image Skeleton */}
                  <div className="md:w-80 flex-shrink-0">
                    <div className="w-full h-48 md:h-full bg-gray-200"></div>
                  </div>
                  {/* Content Skeleton */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-200 rounded w-32"></div>
                      <div className="h-8 bg-gray-200 rounded w-28"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Error loading courses</p>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageLayout
      paddingSize="none"
      pagination={
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      }
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-lg font-medium text-foreground">
          Showing {items.length} {items.length === 1 ? "course" : "courses"}
        </h1>
        {/* <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort By:</span>
          <Select defaultValue="in-progress">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in-progress">In progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not-started">Not started</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      {/* Course List - Single Column */}
      <div className="space-y-6 mb-4">
        {items.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              No enrolled courses found
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Start learning by enrolling in a course
            </p>
          </div>
        ) : (
          items
            .filter((course: ILearningCourse) => course != null && course.id != null)
            .map((course: ILearningCourse, index: number) => (
              <LearningCourseItem key={course.id || index} course={course} />
            ))
        )}
      </div>
    </PageLayout>
  );
};

export default LearningCourseList;
