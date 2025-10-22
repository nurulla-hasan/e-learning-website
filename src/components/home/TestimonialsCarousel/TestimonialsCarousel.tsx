"use client"

import TestimonialCard from "./TestimonialCard"
import { useTranslations } from "next-intl"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useGetTopReviewsQuery } from "@/redux/feature/course/courseApi"
import { Review } from "@/types/course.type"

const TestimonialsCarousel = () => {
  const t = useTranslations("HomePage.testimonials")
  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: true })

  const { data, isLoading, isError } = useGetTopReviewsQuery({})
  const testimonials: Review[] = data?.data || []

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-title mb-4 md:mb-6">
              {t("title")}
            </h2>
            <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (isError) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-title mb-4 md:mb-6">
              {t("title")}
            </h2>
            <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Unable to load reviews. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-title mb-4 md:mb-6">
            {t("title")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {testimonials.length > 0 ? (
            <Carousel className="w-full" opts={{ loop: true }} plugins={[autoplay]}>
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                    <TestimonialCard testimonial={testimonial} isActive={false} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No reviews available yet.</p>
            </div>
          )}
        </div>

        {/* Mobile swipe hint */}
        <p
          className="text-center text-gray-400 text-sm mt-4 md:hidden"
        >
          Swipe or use arrows to navigate
        </p>
      </div>
    </section>
  )
}

export default TestimonialsCarousel;
