"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays, MapPin, Clock, DollarSign, CheckCircle } from "lucide-react";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAcceptedTrainingsRequestQuery } from "@/redux/feature/course/courseApi";

interface Item {
  id: string;
  userId: string;
  courseId: string;
  location: string;
  duration: string | null;
  price: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  courseTitle?: string;
  courseLevel?: string;
  instructorName?: string;
  courseThumbnail?: string;
  categoryName?: string;
  course?: {
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


export default function AcceptedRequestsTab() {
  const t = useTranslations("TrainingRequest");
    const {
    // currentPage,
    // setCurrentPage,
    // totalPages,
    items,
    isLoading,
    isError,
  } = useSmartFetchHook(useGetAcceptedTrainingsRequestQuery);

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
        <p className="text-muted-foreground">{t("no_accepted_requests")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        // Type guard to ensure item is a valid training request
        const request = item as Item;
        if (!request || typeof request !== 'object' || !request.id) {
          return null; // Skip invalid items
        }

        return (
          <Card key={request.id || index} className="hover:shadow-md transition-shadow border-green-200 bg-green-50/30">
            <CardContent>
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={request.courseThumbnail || request.course?.courseThumbnail || ''}
                    alt={request.courseTitle || request.course?.courseTitle || 'Course'}
                    fill
                    sizes="(max-width: 768px) 80px, 80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {request.courseTitle || request.course?.courseTitle || 'Untitled Course'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        by {request.instructorName || request.course?.instructorName || 'Unknown Instructor'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {request.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      </span>
                      {request.categoryName || request.course?.category?.name || 'Uncategorized'}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      </span>
                      {request.courseLevel || request.course?.courseLevel || 'Beginner'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{request.location || 'Location not specified'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-green-600">
                        zł {request.price || request.course?.price || 0}
                      </span>
                    </div>
                  </div>

                  {request.duration && (
                    <div className="flex items-center gap-2 text-sm mt-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{request.duration}</span>
                    </div>
                  )}

                  <div className="mt-3 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm text-green-800">
                      🎉 Your training request has been {request.status.toLowerCase()}!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
