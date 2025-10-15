"use client";
import PageHeader from "@/components/common/PageHeader";
import { useTranslations } from "next-intl";
import { useGetBookmarkedCoursesQuery } from "@/redux/feature/course/courseApi";
import CourseCardSkeleton from "@/skeleton/course/CourseCardSkeleton";
import Error from "@/tools/Error";
import NoData from "@/tools/NoData";
import PageLayout from "@/tools/PageLayout";
import FavouriteCourseCard from "@/components/favorite/FavouriteCourseCard";

const FavoritesPage = () => {
  const t = useTranslations("Header");
  const title = t("favorites");

const {data, isLoading, isError} = useGetBookmarkedCoursesQuery({})

  return (
    <>
      <PageHeader title={title}/>
      {/* Main Content */}
      <PageLayout
        paddingSize="compact"
      >
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
            data?.data?.map((favorite: any, index: number) => (
              <FavouriteCourseCard key={index} favorite={favorite} />
            ))
          )}
        </div>
      </PageLayout>
    </>
  )
}


export default FavoritesPage