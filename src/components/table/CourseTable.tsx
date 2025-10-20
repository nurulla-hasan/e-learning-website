"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Skeleton } from "@/components/ui/skeleton";

import { LearningHistoryItem } from "@/types/learning-history.type";

const CourseTable = ({
  items,
  isLoading,
  isError,
}: {
  items: LearningHistoryItem[];
  isLoading?: boolean;
  isError?: boolean;
}) => {
  return (
    <Card className="overflow-hidden p-0 mb-4">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="text-left p-4 font-semibold text-foreground">Course Name</th>
              <th className="text-left p-4 font-semibold text-foreground">Status</th>
              <th className="text-left p-4 font-semibold text-foreground">Enrolled Date</th>
              <th className="text-left p-4 font-semibold text-foreground">Progress</th>
              <th className="text-left p-4 font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-4 space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="p-4">
                  <p className="text-center text-red-500">Failed to load learning history</p>
                </td>
              </tr>
            ) : (
              items.map((course, index) => (
                <tr key={course.id} className={index !== items.length - 1 ? "border-b" : ""}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={course.courseThumbnail || "/placeholder.svg"}
                          alt={course.courseTitle}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-foreground text-pretty">{course.courseTitle}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={course.paymentStatus === "COMPLETED" ? "default" : "secondary"}
                      className={course.paymentStatus === "COMPLETED" ? "bg-green-100 text-green-800" : ""}
                    >
                      {course.paymentStatus}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {course.isCompleted ? "Completed" : `${course.totalLessons} lessons`}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link href={`/courses/${course.courseId}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Course
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 p-4">
        {isLoading ? (
          <>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </>
        ) : isError ? (
          <p className="text-center text-red-500 py-8">Failed to load learning history</p>
        ) : (
          items.map((course) => (
            <Card key={course.id} className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={course.courseThumbnail || "/placeholder.svg"}
                    alt={course.courseTitle}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-pretty leading-tight">
                    {course.courseTitle}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={course.paymentStatus === "COMPLETED" ? "default" : "secondary"}
                      className={course.paymentStatus === "COMPLETED" ? "bg-green-100 text-green-800" : ""}
                    >
                      {course.paymentStatus}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.isCompleted ? "Completed" : `${course.totalLessons} lessons`}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Link href={`/courses/${course.courseId}`} className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Course
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        )}
      </div>
    </Card>
  );
};

export default CourseTable;