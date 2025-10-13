"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { coursesData } from "@/data/course.data"
import CourseListItem from "./CourseListItem"
import FilterSidebar from "./FilterSidebar"
import SearchForm from "./SearchForm"
import CourseSorting from "./CourseSorting"
import { useTranslations } from "next-intl"



const CourseList = () =>{
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  //const [priceRange, setPriceRange] = useState([50, 2500])
  const [sortBy, setSortBy] = useState("price-low")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
   const t = useTranslations('CoursesPage');

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category)
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level)
    //const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesLevel
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })




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
                  <FilterSidebar selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedLevels={selectedLevels} setSelectedLevels={setSelectedLevels}/>
                </div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedLevels={selectedLevels} setSelectedLevels={setSelectedLevels}/>
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
