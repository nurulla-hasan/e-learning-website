import { IPopularCourse } from "@/types/course.type"
import { Star } from "lucide-react"
import Image from "next/image"

type TProps = {
    course: IPopularCourse
}

const PopularCourseItem = ({ course }: TProps) => {
  return (
    <>
      <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Course image */}
            <div className="aspect-video overflow-hidden">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                width={600}
                height={600}
              />
            </div>

            {/* Course content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">{course.title}</h3>

              {/* Price and rating */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">${course.currentPrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through">${course.originalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
            </div>
          </div>
    </>
  )
}

export default PopularCourseItem