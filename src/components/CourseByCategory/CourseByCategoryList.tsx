"use client";

import { useEffect, useMemo, useState } from "react";
import CourseListItem from "./CourseListItem";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import { useGetCoursesQuery } from "@/redux/feature/course/courseApi";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { Course } from "@/types/course.type";
import PageLayout from "@/tools/PageLayout";
import CustomPagination from "@/tools/CustomPagination";

const CourseByCategoryList = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category as string);
  const [sortBy, setSortBy] = useState<"price-low" | "price-high">("price-low");
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const initialHookParams = useMemo(() => {
    const [field, order] =
      sortBy === "price-low" ? ["price", "asc"] : ["price", "desc"];
    return {
      categoryName: decodedCategory,
      sortBy: field,
      sortOrder: order,
      searchTerm: localSearchTerm,
    };
  }, [decodedCategory, sortBy, localSearchTerm]);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    items,
    isLoading,
    isError,
    setFilterParams,
  } = useSmartFetchHook<Course>(useGetCoursesQuery, {}, initialHookParams);

  useEffect(() => {
    const [field, order] =
      sortBy === "price-low" ? ["price", "asc"] : ["price", "desc"];

    setFilterParams({
      categoryName: decodedCategory,
      sortBy: field,
      sortOrder: order,
      searchTerm: localSearchTerm,
    });
  }, [decodedCategory, sortBy, setFilterParams, localSearchTerm]);

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Error loading courses. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <PageLayout
          paddingSize="none"
          pagination={
            <CustomPagination
              onPageChange={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          }
        >
          <div className="flex items-center justify-between">
            <nav className="text-sm text-muted-foreground">
              <span>Home</span> /{" "}
              <span className="text-foreground">{decodedCategory}</span>
            </nav>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </PageLayout>
      </header>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <p className="text-muted-foreground">
                {items.length} courses in "{decodedCategory}"
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select
                  value={sortBy}
                  onValueChange={(value) =>
                    setSortBy(value as "price-low" | "price-high")
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {items.map((course: Course) => (
                <CourseListItem key={course.id} course={course} />
              ))}
            </div>

            {items.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No courses found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseByCategoryList;
