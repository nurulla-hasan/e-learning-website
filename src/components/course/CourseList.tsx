"use client";

import { useEffect, useState } from "react";
import { Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseListItem from "./CourseListItem";
import FilterSidebar from "./FilterSidebar";
import SearchForm from "./SearchForm";
import CourseSorting from "./CourseSorting";
import { useTranslations } from "next-intl";
import PageLayout from "@/tools/PageLayout";
import CustomPagination from "@/tools/CustomPagination";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import {
  useGetCategoriesQuery,
  useGetCoursesQuery,
} from "@/redux/feature/course/courseApi";
import NoData from "@/tools/NoData";
import Error from "@/tools/Error";
import CourseCardSkeleton from "@/skeleton/course/CourseCardSkeleton";

const CourseList = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState("price-low");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const t = useTranslations("CoursesPage");

  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    items,
    isLoading,
    isError,
    setFilterParams,
  } = useSmartFetchHook(useGetCoursesQuery);

  useEffect(() => {
    const params: Record<string, any> = {};

    // Only include parameters that have values
    if (selectedCategories.length > 0)
      params.categoryName = selectedCategories.join(",");
    if (selectedLevels.length > 0)
      params.courseLevel = selectedLevels.join(",");
    if (minRating > 0) params.rating = minRating;
    if (sortBy && sortBy !== "price-low") params.sortBy = sortBy;

    // Only include price range if it's not the default
    if (priceRange[0] !== 0 || priceRange[1] !== 2000) {
      params.priceMin = priceRange[0];
      params.priceMax = priceRange[1];
    }

    setFilterParams(params);
  }, [
    selectedCategories,
    selectedLevels,
    priceRange,
    minRating,
    sortBy,
    setFilterParams,
  ]);

  const { data, isLoading: categoriesLoading } = useGetCategoriesQuery({});
  const categories = data?.data;

  // const sortedCourses: any[] = [];

  return (
    <>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PageLayout
        pagination={
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        }
        paddingSize="none"
      >
        {/* Course List */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="w-full mb-4"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            {isMobileFilterOpen && (
              <div className="mb-6">
                <FilterSidebar
                  categories={categories}
                  categoriesLoading={categoriesLoading}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedLevels={selectedLevels}
                  setSelectedLevels={setSelectedLevels}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  minRating={minRating}
                  setMinRating={setMinRating}
                />
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              categories={categories}
              categoriesLoading={categoriesLoading}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedLevels={selectedLevels}
              setSelectedLevels={setSelectedLevels}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minRating={minRating}
              setMinRating={setMinRating}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <p className="text-muted-foreground">
                {t("showing")} {items?.length} {t("results")}
              </p>
              <CourseSorting sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))
              ) : isError ? (
                <Error msg="An error occurred while loading courses." />
              ) : items?.length === 0 ? (
                <NoData msg="No courses found matching your criteria." />
              ) : (
                items?.map((course: any, index: number) => (
                  <CourseListItem key={index} course={course} />
                ))
              )}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default CourseList;
