"use client"

import { useState } from "react"
import { coursesByCategory } from "@/data/course.data"
import CourseListItem from "./CourseListItem"
import SearchForm from "./SearchForm"
import CourseSorting from "./CourseSorting"
import { useParams } from "next/navigation"



const CourseByCategoryList = () =>{
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category as string); // ✅ decode the URL param
  const [searchTerm, setSearchTerm] = useState("")
  //const [priceRange, setPriceRange] = useState([50, 2500])
  const [sortBy, setSortBy] = useState("price-low")

  const filteredCourses = coursesByCategory.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchCategory= course.category===decodedCategory

    return matchesSearch && matchCategory;
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
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} category={decodedCategory}/>
       <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
        
            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <p className="text-muted-foreground">Showing {sortedCourses.length} results</p>
                <CourseSorting sortBy={sortBy} setSortBy={setSortBy}/>
              </div>

              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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

export default CourseByCategoryList;
