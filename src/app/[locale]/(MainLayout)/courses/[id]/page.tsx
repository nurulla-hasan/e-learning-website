"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Clock, Award, CheckCircle, Play, Bookmark } from "lucide-react";
import { TrainingRequestModal } from "@/components/training/TrainingRequestModal";
import Image from "next/image";
import CurriculamTab from "@/components/SingleCourse/CurriculamTab";
import ReviewTab from "@/components/SingleCourse/ReviewTab";
import {
  useGetCourseByIdQuery,
  useGetCourseByIdWithAuthQuery,
} from "@/redux/feature/course/courseApi";
import { StarRating } from "@/tools/StarRating";
import PageLayout from "@/tools/PageLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useFavorite from "@/hooks/useFavorite";
import { SuccessToast } from "@/lib/utils";
import { useAddToCartMutation } from "@/redux/feature/cart/cartApi";
import { useAddToCheckoutMutation } from "@/redux/feature/checkout/checkoutApi";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

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
  const router = useRouter();
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const t = useTranslations("CourseDetails");
  const tCourses = useTranslations("CoursesPage");

  // Use RTK Query's skip option for conditional queries
  const {
    data: authData,
    isLoading: authLoading,
    error: authError,
  } = useGetCourseByIdWithAuthQuery(id, {
    skip: !token,
  });
  const {
    data: publicData,
    isLoading: publicLoading,
    error: publicError,
  } = useGetCourseByIdQuery(id, {
    skip: !!token,
  });

  // Select data based on token
  const data = token ? authData : publicData;
  const isLoading = token ? authLoading : publicLoading;
  const error = token ? authError : publicError;

  const course = data?.data as Course | undefined;

  const { isFavorite, onFavoriteToggle } = useFavorite(
    course?.isFavoriteCourse || false
  );

  const [addToCart, { isLoading: cartLoading }] = useAddToCartMutation();
  const handleAddToCart = async () => {
    try {
      await addToCart({ courseId: course?.id }).unwrap();
      SuccessToast(t("toast.added_to_cart"));
    } catch {
      // console.log(error);
    }
  };

  const [addToCheckout, { isLoading: checkoutLoading }] =
    useAddToCheckoutMutation();
  const handleAddToCheckout = async () => {
    try {
      await addToCart({ courseId: course?.id }).unwrap();
      await addToCheckout({ courseIds: [course?.id] }).unwrap();
      SuccessToast(t("toast.added_to_checkout"));
      router.push("/checkout");
    } catch {
      // console.log(error);
    }
  };

  if (isLoading) {
    return (
      <PageLayout paddingSize="none">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-red-500">{t("error_loading")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card">
        <PageLayout paddingSize="none">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{tCourses("course_bradcramb_home")}</span>
            <span>/</span>
            <span>{tCourses("course_bradcramb_courses")}</span>
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
                    {t("stats.enrolled", {
                      count: course?.totalEnrollments || 0,
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {t("stats.last_update", {
                      date: new Date(course?.lastUpdated).toLocaleDateString(),
                    })}
                  </span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {t("labels.instructor")}
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
                <TabsTrigger value="description">
                  {t("tabs.description")}
                </TabsTrigger>
                <TabsTrigger value="curriculum">
                  {t("tabs.curriculum")}
                </TabsTrigger>
                <TabsTrigger value="reviews">{t("tabs.reviews")}</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("description.about_title")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {course?.courseDescription}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("description.instructor_title")}
                  </h3>
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
                <div className="relative aspect-video bg-linear-to-br from-blue-600 to-purple-700 rounded-t-lg overflow-hidden">
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
                      {t("preview_button")}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      zł {course.discountPrice || course.price}
                    </span>
                    {course.discountPrice &&
                      course.discountPrice < course.price && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${course.price}
                        </span>
                      )}
                  </div>

                  {token && userRole !== "EMPLOYEE" && (
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

                {userRole !== "EMPLOYEE" && (
                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={cartLoading}
                    >
                      {tCourses("add_to_cart")}
                    </Button>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleAddToCheckout}
                      disabled={checkoutLoading}
                      loading={checkoutLoading || cartLoading}
                    >
                      {tCourses("buy_now")}
                    </Button>
                    <TrainingRequestModal
                      courseId={course.id}
                      courseName={course.courseTitle}
                    >
                      <Button variant="outline" className="w-full text-primary">
                        {t("actions.request_training")}
                      </Button>
                    </TrainingRequestModal>
                  </div>
                )}

                {/* Course Stats */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">{t("stats.lessons")}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.totalLessons}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">{t("stats.quizzes")}</span>
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
                      <span className="text-sm">{t("stats.duration")}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.totalDuration > 0
                        ? `${course.totalDuration} min`
                        : t("stats.not_available")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">{t("stats.skill_level")}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.skillLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">{t("stats.certificate")}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.certificate ? t("common.yes") : t("common.no")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {tCourses("stats.lifetime_access")}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.lifetimeAccess
                        ? t("common.yes")
                        : t("common.no")}
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
