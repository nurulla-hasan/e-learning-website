"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Users,
  Clock,
  Award,
  CheckCircle,
  Play,
  Bookmark,
} from "lucide-react";
import { TrainingRequestModal } from "@/components/training/TrainingRequestModal";
import Image from "next/image";
import CurriculamTab from "@/components/SingleCourse/CurriculamTab";
import ReviewTab from "@/components/SingleCourse/ReviewTab";
import { useGetCourseByIdQuery, useGetCourseByIdWithAuthQuery } from "@/redux/feature/course/courseApi";
import { StarRating } from "@/tools/StarRating";
import PageLayout from "@/tools/PageLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useFavorite from "@/hooks/useFavorite";

// Define types based on API response
interface Lesson {
  title: string;
  order: number;
}

interface Test {
  id: string;
  title: string;
}

interface Section {
  id: string;
  courseId: string;
  title: string;
  order: number;
  totalLength: number;
  totalLessons: number;
  testCount: number;
  createdAt: string;
  updatedAt: string;
  Lesson: Lesson[];
  Test: Test[];
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    image?: string;
  };
}

interface Course {
  categoryName: string;
  id: string;
  courseTitle: string;
  courseShortDescription: string;
  courseDescription: string;
  courseLevel: string;
  price: number;
  discountPrice?: number;
  instructorName: string;
  instructorImage: string;
  instructorDesignation: string;
  instructorDescription: string;
  courseThumbnail: string;
  totalLessons: number;
  totalSections: number;
  totalDuration: number;
  avgRating: number;
  totalRatings: number;
  totalEnrollments: number;
  lastUpdated: string;
  skillLevel: string;
  certificate: boolean;
  lifetimeAccess: boolean;
  Section: Section[];
  Review: Review[];
  isFavoriteCourse?: boolean;
}

const CourseDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  // Use RTK Query's skip option for conditional queries
  const { data: authData, isLoading: authLoading, error: authError } = useGetCourseByIdWithAuthQuery(id, {
    skip: !token,
  });
  const { data: publicData, isLoading: publicLoading, error: publicError } = useGetCourseByIdQuery(id, {
    skip: !!token,
  });

  // Select data based on token
  const data = token ? authData : publicData;
  const isLoading = token ? authLoading : publicLoading;
  const error = token ? authError : publicError;

  const course = data?.data as Course | undefined;

  const { isFavorite, onFavoriteToggle } = useFavorite(course?.isFavoriteCourse || false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-red-500">Error loading course details</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card">
        <PageLayout paddingSize="none">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Home</span>
            <span>/</span>
            <span>Courses</span>
            <span>/</span>
            <span>{course.categoryName}</span>
          </nav>
        </PageLayout>
      </header>

      <PageLayout paddingSize="none">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-balance">
                {course?.courseTitle}
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                {course?.courseShortDescription}
              </p>

              {/* Rating and Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    <StarRating
                      rating={course?.avgRating || 0}
                      totalStars={1}
                      size={16}
                    />
                  </div>
                  <span className="font-semibold">
                    {course?.avgRating || 0}
                  </span>
                  <span className="text-muted-foreground">
                    ({course?.totalRatings})
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>
                    {course?.totalEnrollments} enrolled in this course
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    Last update{" "}
                    {new Date(course?.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Instructor:
                </span>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={course?.instructorImage} />
                    <AvatarFallback>
                      {course?.instructorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {course?.instructorName}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">About the Course:</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {course?.courseDescription}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Instructor:</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={course?.instructorImage} />
                      <AvatarFallback>
                        {course?.instructorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold">
                        {course?.instructorName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {course?.instructorDesignation}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {course?.instructorDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <CurriculamTab sections={course?.Section} />
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <ReviewTab reviews={course?.Review} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Preview Card */}
            <Card className="pt-0">
              <CardHeader className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-t-lg overflow-hidden">
                  <Image
                    src={course?.courseThumbnail}
                    alt={course?.courseTitle}
                    className="w-full h-full object-cover"
                    width={600}
                    height={600}
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-full"
                    >
                      <Play className="w-6 h-6 mr-2" />
                      PREVIEW
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      ${course.discountPrice || course.price}
                    </span>
                    {course.discountPrice &&
                      course.discountPrice < course.price && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${course.price}
                        </span>
                      )}
                  </div>

                  {token && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`border h-8 w-8 p-0 bg-white/80 hover:bg-white/90 rounded-full shadow-sm ${
                        isFavorite ? "bg-red-50 hover:bg-red-100" : ""
                      }`}
                      onClick={() => onFavoriteToggle(course.id)}
                    >
                      <Bookmark
                        className={`${
                          isFavorite
                            ? "fill-red-500 text-red-500"
                            : "fill-none text-gray-500"
                        }`}
                      />
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Add To Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    Buy Now
                  </Button>
                  <TrainingRequestModal 
                    courseId={course.id}
                    courseName={course.courseTitle}
                  >
                    <Button variant="outline" className="w-full text-primary">
                      Request In-Person Training
                    </Button>
                  </TrainingRequestModal>
                </div>

                {/* Course Stats */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Lessons</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.totalLessons}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Quizzes</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.Section?.reduce(
                        (acc, section) => acc + (section.Test?.length || 0),
                        0
                      ) || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.totalDuration > 0
                        ? `${course.totalDuration} min`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">Skill Level</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.skillLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">Certificate</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.certificate ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Full Lifetime Access</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.lifetimeAccess ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default CourseDetailsPage;
