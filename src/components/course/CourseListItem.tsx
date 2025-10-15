// src/components/course/CourseListItem.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseListItemProps {
  course: {
    id: string;
    courseTitle: string;
    courseShortDescription: string;
    courseDescription: string;
    courseLevel: string;
    price: number;
    discountPrice: number;
    courseThumbnail: string;
    avgRating: number;
    totalRatings: number;
    categoryName: string;
    instructorName: string;
    instructorImage: string;
    totalLessons: number;
    totalDuration: number;
    isBookmarked: boolean;
  };
}

const CourseListItem = ({ course }: CourseListItemProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col pt-0 gap-3">
      <div className="relative">
        <Link
          href={`/courses/${course?.id}`}
          className="aspect-video relative overflow-hidden block"
        >
          <Image
            src={course?.courseThumbnail || "/placeholder.svg"}
            alt={course?.courseTitle}
            className="w-full h-full object-cover"
            width={500}
            height={280}
            priority
          />
        </Link>
      </div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg leading-tight">
            {course?.courseTitle}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-muted-foreground text-sm">
              {course?.avgRating}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {course?.courseShortDescription || course?.courseDescription}
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {course?.categoryName}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {course?.courseLevel}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {course?.discountPrice > 0 && (
              <span className="text-xl font-bold text-primary">
                ${course?.discountPrice || course?.price}
              </span>
            )}
            {course?.discountPrice && course?.discountPrice < course?.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${course?.price}
              </span>
            )}
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Enroll Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseListItem;
