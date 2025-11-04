"use client";
import PageHeader from "@/components/common/PageHeader";
import { useTranslations } from "next-intl";
import { useGetBookmarkedCoursesQuery } from "@/redux/feature/course/courseApi";
import CourseCardSkeleton from "@/skeleton/course/CourseCardSkeleton";
import Error from "@/tools/Error";
import NoData from "@/tools/NoData";
import PageLayout from "@/tools/PageLayout";
import FavouriteCourseCard from "@/components/favorite/FavouriteCourseCard";

// Define the type for the nested course object
interface Course {
  id: string;
  courseTitle: string;
  courseShortDescription?: string;
  courseLevel: string;
  price: number;
  discountPrice?: number;
  courseThumbnail: string;
  category: {
    name: string;
  };
}

// Define the type for the favorite object, which contains the course
interface Favorite {
  id: string; // This is the ID of the bookmark/favorite entry itself
  courseId: string;
  course: Course;
}

const FavoritesPage = () => {
  const t = useTranslations("Header");
  const title = t("favorites");

  const { data, isLoading, isError } = useGetBookmarkedCoursesQuery({});

  return (
    <>
      <PageHeader title={title} />
      {/* Main Content */}
      <PageLayout paddingSize="compact">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))
          ) : isError ? (
            <Error msg="An error occurred while loading courses." />
          ) : data?.data?.length === 0 ? (
            <NoData msg="No courses found matching your criteria." />
          ) : (
            data?.data?.map((favorite: Favorite, index: number) => (
              <FavouriteCourseCard key={index} favorite={favorite} />
            ))
          )}
        </div>
      </PageLayout>
    </>
  );
};

export default FavoritesPage;
