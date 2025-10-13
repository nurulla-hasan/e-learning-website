"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Clock, BookOpen } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

interface Course {
  id: string
  title: string
  instructor: string
  rating: number
  totalRatings: number
  totalHours: number
  lessons: number
  price: number
  image: string
  selected: boolean
}

const initialCourses: Course[] = [
  {
    id: "1",
    title: "Figma UI/UX Design: Web and App Design",
    instructor: "Robert Smith",
    rating: 4.8,
    totalRatings: 66,
    totalHours: 35,
    lessons: 48,
    price: 40.0,
    image: "/images/cart/figma-ui-ux-design-course.jpg",
    selected: true,
  },
  {
    id: "2",
    title: "Web Design & Development Fundamentals",
    instructor: "Robert Smith",
    rating: 4.8,
    totalRatings: 66,
    totalHours: 35,
    lessons: 48,
    price: 35.0,
    image: "/images/cart/web-development-course.png",
    selected: true,
  },
  {
    id: "3",
    title: "Learn Ethical Hacking From Scratch",
    instructor: "Robert Smith",
    rating: 4.8,
    totalRatings: 55,
    totalHours: 35,
    lessons: 48,
    price: 55.0,
    image: "/images/cart/ethical-hacking-cybersecurity-course.jpg",
    selected: false,
  },
  {
    id: "4",
    title: "Graphic Design-Photoshop Essential Training",
    instructor: "Robert Smith",
    rating: 4.8,
    totalRatings: 66,
    totalHours: 35,
    lessons: 48,
    price: 42.0,
    image: "/images/cart/photoshop-graphic-design-course.jpg",
    selected: false,
  },
  {
    id: "5",
    title: "Digital Marketing Mastery-Social Media & Ads",
    instructor: "Robert Smith",
    rating: 4.8,
    totalRatings: 55,
    totalHours: 35,
    lessons: 48,
    price: 65.0,
    image: "/images/cart/digital-marketing-social-media-course.jpg",
    selected: false,
  },
]

const Cart = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const totalPrice = courses.reduce((sum, course) => sum + course.price, 0);
  const t = useTranslations('CartPage');


  const removeCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
        }`}
      />
    ))
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course List */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            {
                courses?.length > 0 ? (
                        <h1 className="text-2xl font-bold text-foreground mb-2">{courses.length} {t("cart_title")}</h1>

                ) : (
                      <h1 className="text-2xl font-bold text-foreground mb-2">{t("no_items")}</h1>
                )
            }
          </div>

          <div className="space-y-4">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden pl-3 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Course Image */}
                    <div className="relative sm:w-40 sm:h-28 w-full h-48 flex-shrink-0">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        height={600}
                        width={600}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-card-foreground text-sm sm:text-base leading-tight mb-1">
                              {course.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-2">By {course.instructor}</p>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-card-foreground">{course.rating}</span>
                              <div className="flex">{renderStars(course.rating)}</div>
                              <span className="text-xs text-muted-foreground">({course.totalRatings} Ratings)</span>
                            </div>

                            {/* Course Meta */}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{course.totalHours} total hours</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                <span>{course.lessons} lessons</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <div className="text-lg font-bold text-card-foreground">${course.price.toFixed(2)}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCourse(course.id)}
                            className="text-primary hover:text-primary/80 p-1 h-auto"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-card-foreground mb-6">{t("order_overview")}</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t("total_courses")}:</span>
                  <span className="font-medium text-card-foreground">{courses.length}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-muted-foreground">{t("subtotal")}:</span>
                  <span className="text-xl font-bold text-card-foreground">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={()=> router.push("/checkout")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3"
                disabled={courses.length === 0}
              >
                {t("checkout_button")}
              </Button>

              {courses.length === 0 && (
                <p className="text-sm text-muted-foreground text-center mt-3">
                  Select courses to proceed with checkout
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Cart;