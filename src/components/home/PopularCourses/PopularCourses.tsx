"use client"
import PopularCourseItem from "./PopularCourseItem"
import { useTranslations } from "next-intl"
import { useGetPopularCoursesQuery } from "@/redux/feature/course/courseApi"
import { IPopularCourse } from "@/types/course.type"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

const PopularCourses = () => {
  const t = useTranslations("HomePage")
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  const { data, isLoading, isError } = useGetPopularCoursesQuery({})
  const popularCourses: IPopularCourse[] = data?.data || []

  // Loading state
  if (isLoading) {
    return (
      <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t('popular_courses')}</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    )
  }

  // Error state
  if (isError) {
    return (
      <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t('popular_courses')}</h2>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Unable to load popular courses. Please try again later.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{t('popular_courses')}</h2>
      </div>

      {/* Carousel Container */}
      {popularCourses.length > 0 ? (
        <div className="relative">
          <Carousel
            className="w-full"
            opts={{
              loop: true,
              align: "start",
              skipSnaps: false,
              dragFree: false,
            }}
            plugins={[autoplay.current]}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {popularCourses?.map((course: IPopularCourse) => (
                <CarouselItem
                  key={course.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <PopularCourseItem course={course} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No popular courses available at the moment.</p>
        </div>
      )}

      {/* Mobile navigation hint */}
      <div className="flex md:hidden items-center justify-center gap-2 mt-6">
        <p className="text-center text-gray-400 text-sm">
          Swipe or use navigation buttons to browse courses
        </p>
      </div>
    </section>
  )
}

export default PopularCourses;