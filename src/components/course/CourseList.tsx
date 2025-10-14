"use client"

import { useEffect, useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import CourseListItem from "./CourseListItem"
import FilterSidebar from "./FilterSidebar"
import SearchForm from "./SearchForm"
import CourseSorting from "./CourseSorting"
import { useTranslations } from "next-intl"



const CourseList = () =>{
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<number[]>([50, 2500])
  const [minRating, setMinRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState("price-low")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
   const t = useTranslations('CoursesPage');

  useEffect(() => {
    console.log("Course filters changed:", {
      searchTerm,
      selectedCategory,
      selectedLevel,
      priceRange,
      minRating,
      sortBy,
    })
  }, [searchTerm, selectedCategory, selectedLevel, priceRange, minRating, sortBy])

  const sortedCourses: any[] = []




  return (
    <>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
       <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                    selectedLevel={selectedLevel} 
                    setSelectedLevel={setSelectedLevel}
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
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                selectedLevel={selectedLevel} 
                setSelectedLevel={setSelectedLevel}
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
                <p className="text-muted-foreground">{t("showing")} {sortedCourses.length} {t('results')}</p>
                <CourseSorting sortBy={sortBy} setSortBy={setSortBy}/>
              </div>

              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedCourses.map((course, index) => (
                  <CourseListItem key={index} course={course} />
                ))}
              </div>

              {sortedCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No courses found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
    </>
  )
}

export default CourseList;
