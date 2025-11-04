import { IPopularCourse } from "@/types/course.type";
import { Star, Clock, Users } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type TProps = {
  course: IPopularCourse;
};

const PopularCourseItem = ({ course }: TProps) => {
  return (
    <>
      <Link href={`/courses/${course.id}`}>
        <div className="group rounded-xl overflow-hidden transition-shadow duration-300 h-full flex flex-col border">
          {/* Course image */}
          <div className="aspect-video overflow-hidden">
            <Image
              src={course.courseThumbnail || "/placeholder.svg"}
              alt={course.courseTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={600}
              height={600}
            />
          </div>

          {/* Course content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Category badge */}
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs">
                {course.categoryName}
              </Badge>
            </div>

            {/* Course title */}
            <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
              {course.courseTitle}
            </h3>

            {/* Instructor */}
            <div className="flex items-center gap-2 mb-3">
              <Image
                src={course.instructorImage || "/placeholder.svg"}
                alt={course.instructorName}
                className="w-6 h-6 rounded-full object-cover"
                width={24}
                height={24}
              />
              <span className="text-sm text-gray-600">
                {course.instructorName}
              </span>
            </div>

            {/* Rating and stats */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">
                  {course.avgRating?.toFixed(1) || "0.0"}
                </span>
                <span className="text-xs text-gray-500">
                  ({course.totalRatings || 0})
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="h-3 w-3" />
                <span>{course.totalEnrollments || 0}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-xl font-bold text-primary">
                ${course.discountPrice?.toFixed(2) || course.price?.toFixed(2)}
              </span>
              {course.discountPrice && course.discountPrice < course.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${course.price?.toFixed(2)}
                </span>
              )}
            </div>

            {/* Course level and duration */}
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <Badge variant="outline" className="text-xs">
                {course.courseLevel}
              </Badge>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{course.totalLessons || 0} lessons</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PopularCourseItem;
