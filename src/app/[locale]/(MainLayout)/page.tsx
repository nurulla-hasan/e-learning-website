import Categories from "@/components/home/categories/Categories";
import Hero from "@/components/home/Hero";
import PlatformFeatures from "@/components/home/PlatformFeatures/PlatformFeatures";
import PopularCourses from "@/components/home/PopularCourses/PopularCourses";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel/TestimonialsCarousel";

const HomePage = () => {
  return (
    <>
      <Hero/>
      <Categories/>
      <PlatformFeatures/>
      <PopularCourses/>
      <TestimonialsCarousel/>
    </>
  )
}

export default HomePage;