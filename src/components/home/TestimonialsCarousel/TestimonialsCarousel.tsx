"use client"

import { testimonials } from "@/data/testimonials.data"
import TestimonialCard from "./TestimonialCard"
import { useTranslations } from "next-intl"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const TestimonialsCarousel = () => {
  const t = useTranslations("HomePage.testimonials")
  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: true })

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
