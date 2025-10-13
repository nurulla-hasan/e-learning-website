import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Eye } from "lucide-react";
import Image from "next/image";
import { ILearningCourse } from "@/types/course.type";

type TProps = {
    course: ILearningCourse
}

const LearningCourseItem = ({ course }: TProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-card border border-border pt-0 pb-4">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          height={600}
          width={600}
        />
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-card-foreground text-balance leading-tight">{course.title}</h3>
          <p className="text-sm text-muted-foreground">By {course.instructor}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-card-foreground">{course.progress}% Complete</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>

        <div className="pt-2">
          {course.isCompleted ? (
            <div className="flex flex-col sm:flex-col gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-2 py-1 bg-transparent cursor-pointer">
                <Download className="h-4 w-4" />
                Download Certificate
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent cursor-pointer">
                <Eye className="h-4 w-4" />
                View Certificate
              </Button>
            </div>
          ) : (
            <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              Continue Learning
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default LearningCourseItem;