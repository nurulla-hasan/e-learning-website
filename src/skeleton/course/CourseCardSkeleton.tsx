import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => {
  return (
    <Card className="overflow-hidden h-full flex flex-col pt-0 gap-3">
      <Skeleton className="w-full aspect-video" />
      <CardHeader>
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-12" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-10 w-28" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCardSkeleton;