import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useFavorite from "@/hooks/useFavorite";

// Define the type for the nested course object
interface Course {
  id: string;
  courseTitle: string;
  courseShortDescription?: string;
  courseLevel: string;
  price: number;
  discountPrice?: number;
  courseThumbnail: string;
  category: {
    name: string;
  };
}

// Define the type for the favorite object, which contains the course
interface Favorite {
  id: string; // This is the ID of the bookmark/favorite entry itself
  courseId: string;
  course: Course;
}

type TProps = {
  favorite: Favorite;
};

const FavouriteCourseCard = ({ favorite }: TProps) => {
  const router = useRouter();
  // A course on the favorite page is always favorited initially.
  const { isFavorite, onFavoriteToggle } = useFavorite(true);

  // If the item is no longer a favorite, don't render it.
  if (!isFavorite) {
    return null;
  }

  const { course } = favorite;

  return (
    <Card className="overflow-hidden h-full flex flex-col pt-0 gap-3 hover:shadow-lg transition-shadow relative">
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 z-10 h-8 w-8 p-0 bg-white/80 hover:bg-white/90 rounded-full shadow-sm"
        onClick={() => onFavoriteToggle(favorite.id)} // Use the course ID to toggle favorite status
      >
        <Bookmark className={"fill-red-500 text-red-500"} />
      </Button>
      <Link href={`/courses/${course.id}`} className="aspect-video relative overflow-hidden block">
        <Image
          src={course.courseThumbnail || "/images/categoryImages/abstract-geometric-shapes.png"}
          alt={course.courseTitle}
          className="w-full h-full object-cover"
          width={500}
          height={280}
          priority
        />
      </Link>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight">{course.courseTitle}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3 flex-1">
        {course.courseShortDescription && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.courseShortDescription}</p>
        )}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {course.category.name}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {course.courseLevel}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              ${course.discountPrice || course.price}
            </span>
            {course.discountPrice && course.discountPrice < course.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${course.price}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90"
            onClick={() => router.push(`/courses/${course.id}`)}
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FavouriteCourseCard;
