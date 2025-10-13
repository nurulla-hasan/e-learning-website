import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { popularCurses } from "@/data/course.data"
import PopularCourseItem from "./PopularCourseItem"
import { useTranslations } from "next-intl"


const PopularCourses = () => {
   const t = useTranslations("HomePage")

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{t('popular_courses')}</h2>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-10 w-10 bg-transparent">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10 bg-transparent">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularCurses.map((course, index) => (
          <PopularCourseItem key={index} course={course}/>
        ))}
      </div>

      {/* Mobile navigation */}
      <div className="flex md:hidden items-center justify-center gap-2 mt-6">
        <Button variant="outline" size="icon" className="h-10 w-10 bg-transparent">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="h-10 w-10 bg-transparent">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}

export default PopularCourses;