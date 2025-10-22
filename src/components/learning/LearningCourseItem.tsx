import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button} from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ILearningCourse } from "@/types/course.type";
import { Badge } from "@/components/ui/badge";

type TProps = {
  course: ILearningCourse;
};

const LearningCourseItem = ({ course }: TProps) => {
  const progressPercentage = course.progress?.progress?.overallProgress || 0;
  const isCompleted = progressPercentage >= 100;

  const downloadCertificate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Download Certificate");
  };

  const viewCertificate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("View Certificate");
  };

  return (
    <Link href={`/my-learning/${course.courseId}`}>
      <Card className="group overflow-hidden transition-all duration-200 py-0">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row gap-0">
            {/* Course Image - Left Side */}
            <div className="md:w-80 flex-shrink-0">
              <div className="relative w-full h-48 md:h-full overflow-hidden">
                <Image
                  src={course.courseThumbnail || "/placeholder.svg"}
                  alt={course.courseTitle}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  fill
                />
              </div>
            </div>

            {/* Course Content - Right Side */}
            <div className="flex-1 p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-card-foreground text-lg leading-tight">
                    {course.courseTitle}
                  </h3>
                  {course.lifetimeAccess && (
                    <Badge>
                      Lifetime Access
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  By {course.instructorName}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.courseShortDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {course.categoryName}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {course.courseLevel}
                </span>
                <span className="text-xs">
                  {course.totalLessons} lessons • {course.totalSections}{" "}
                  sections
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-card-foreground">
                    {progressPercentage}% Complete
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="flex items-center justify-between pt-2">
                {isCompleted && (
                  <div className="flex flex-wrap gap-2">
                    {course.certificate && (
                      <>
                        <Button
                          onClick={(e) => downloadCertificate(e)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download Certificate
                        </Button>
                        <Button
                          onClick={(e) => viewCertificate(e)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Certificate
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LearningCourseItem;
