import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Course } from "@/types/course.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAddToCheckoutMutation } from "@/redux/feature/checkout/checkoutApi";
import { useAddToCartMutation } from "@/redux/feature/cart/cartApi";

type TProps = {
  course: Course;
};

const CourseListItem = ({ course }: TProps) => {
    const router = useRouter();
  
    const [addToCart, { isLoading: cartLoading }] = useAddToCartMutation();
    const [addToCheckout, { isLoading: checkoutLoading }] =useAddToCheckoutMutation();
  
  
    const handleEnroll = async(e: React.MouseEvent<HTMLButtonElement>, courseId: string) => {
      e.preventDefault();
      try {
        await addToCart({ courseId: courseId }).unwrap();
        await addToCheckout({ courseIds: [courseId] }).unwrap();
        router.push("/checkout");
      } catch {
        // console.log(error);
      }
    }
  return (
    <>
      <Link href={`/courses/${course?.id}`}>
        <Card className="overflow-hidden h-full flex flex-col pt-0 gap-3">
          <div className="aspect-video relative overflow-hidden">
            <div className="relative">
              <Image
                src={course?.courseThumbnail || "/placeholder.svg"}
                alt={course?.courseTitle}
                className="w-full h-full object-cover"
                width={500}
                height={280}
                priority
              />
            </div>
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
            <div className="flex items-center justify-between gap-2">
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
                {course?.discountPrice &&
                  course?.discountPrice < course?.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${course?.price}
                    </span>
                  )}
              </div>
              <Button
                loading={cartLoading || checkoutLoading}
                onClick={(e) => handleEnroll(e, course?.id)}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                Enroll Now
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default CourseListItem;
