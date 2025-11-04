"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetMyTrainingsRequestQuery } from "@/redux/feature/course/courseApi";

interface TrainingRequest {
  id: string;
  userId: string;
  courseId: string;
  location: string;
  duration: string | null;
  price: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  course: {
    id: string;
    courseTitle: string;
    courseLevel: string;
    instructorName: string;
    price: number;
    courseThumbnail: string;
    category: {
      name: string;
    };
  };
}

export default function PendingRequestsTab() {
  const t = useTranslations("TrainingRequest");

  const {
    // currentPage,
    // setCurrentPage,
    // totalPages,
    items,
    isLoading,
    isError,
  } = useSmartFetchHook(useGetMyTrainingsRequestQuery);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{t("error_loading_requests")}</p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          {t("try_again")}
        </button>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{t("no_pending_requests")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        // Type guard to ensure item is a valid training request
        const request = item as TrainingRequest;
        if (
          !request ||
          typeof request !== "object" ||
          !request.id ||
          !request.course
        ) {
          return null; // Skip invalid items
        }

        return (
          <Card
            key={request?.id || index}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent>
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={request?.course?.courseThumbnail}
                    alt={request.course.courseTitle}
                    fill
                    sizes="(max-width: 768px) 80px, 80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {request.course.courseTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        by {request.course.instructorName}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200"
                    >
                      {request.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      </span>
                      {request.course.category.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      </span>
                      {request.course.courseLevel}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{request.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-green-600">
                        zł {request.course.price}
                      </span>
                    </div>
                  </div>

                  {request.duration && (
                    <div className="flex items-center gap-2 text-sm mt-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{request.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
