"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ChevronRight, Play } from "lucide-react";
import PageLayout from "@/tools/PageLayout";
import { useGetEnrolledCourseByIdQuery } from "@/redux/feature/course/courseApi";
import {
  useMarkLessonAsCompletedMutation,
  useMarkCourseAsCompletedMutation,
} from "@/redux/feature/lesson/lessonApi";
import VideoPlayer from "@/components/learning/lesson/VideoPlayer";
import NavigationControls from "@/components/learning/lesson/NavigationControls";
import LearningSidebar from "@/components/learning/lesson/LearningSidebar";
import type {
  EnrolledCourse,
  Lesson,
} from "@/types/course/enroll.details.type";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const MyLearningDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [selectedSection, setSelectedSection] = React.useState<string | null>(
    null
  );

  // Check if a lesson is completed, supporting both `isCompleted` and legacy `completed` fields
  const isLessonDone = React.useCallback((lesson: Lesson) => {
    return Boolean(
      "isCompleted" in lesson ? lesson.isCompleted : lesson.completed
    );
  }, []);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [currentLesson, setCurrentLesson] = React.useState<Lesson | null>(null);
  const [completedIds, setCompletedIds] = React.useState<Set<string>>(
    new Set()
  );

  const {
    data: response,
    isLoading,
    isError,
  } = useGetEnrolledCourseByIdQuery(id);
  const courseData = response?.data as EnrolledCourse | undefined;
  const progressPercent =
    "progressPercentage" in (courseData || {})
      ? (courseData as { progressPercentage?: number }).progressPercentage ?? 0
      : typeof courseData?.progress === "number"
      ? courseData.progress
      : 0;

  const [markLessonAsCompleted, { isLoading: isMarking }] =
    useMarkLessonAsCompletedMutation();
  const [markCourseAsCompleted, { isLoading: isCompletingCourse }] =
    useMarkCourseAsCompletedMutation();

  // Flatten lessons with absolute order for navigation/locking
  const flatLessons = React.useMemo(
    () =>
      (courseData?.course?.Section || []).flatMap((section, sIdx) =>
        (section.Lesson || []).map((lesson, lIdx) => ({
          sectionId: section.id,
          sectionIndex: sIdx,
          lessonIndex: lIdx,
          id: lesson.id,
          lesson,
        }))
      ),
    [courseData]
  );

  const lessonIndexMap = React.useMemo(() => {
    const m: Record<string, number> = {};
    flatLessons.forEach((it, idx) => {
      m[it.id] = idx;
    });
    return m;
  }, [flatLessons]);

  const currentAbsIndex = currentLesson?.id
    ? lessonIndexMap[currentLesson.id] ?? -1
    : -1;

  // Set the first section and lesson when data is loaded
  React.useEffect(() => {
    if (courseData?.course?.Section?.length) {
      setSelectedSection(courseData.course.Section[0]?.id || null);
      const firstLesson = courseData.course.Section[0]?.Lesson?.[0];
      if (firstLesson) {
        setCurrentLesson(firstLesson);
      }
      // seed completed set from API
      const seeded = new Set<string>();
      courseData.course.Section.forEach((s) =>
        (s.Lesson || []).forEach((l) => {
          if (isLessonDone(l)) seeded.add(l.id);
        })
      );
      setCompletedIds(seeded);
    }
  }, [courseData, isLessonDone]);

  // Navigation helpers
  const goToAbsIndex = (idx: number) => {
    if (idx < 0 || idx >= flatLessons.length) return;
    const target = flatLessons[idx];
    setSelectedSection(target.sectionId);
    setCurrentLesson(target.lesson);
  };

  const handlePrevLesson = () => {
    if (currentAbsIndex > 0) {
      goToAbsIndex(currentAbsIndex - 1);
    }
  };

  const handleNextLesson = async () => {
    if (currentAbsIndex === -1 || !currentLesson?.id) return;
    try {
      await markLessonAsCompleted({ lessonId: currentLesson.id }).unwrap();
      setCompletedIds((prev) => new Set(prev).add(currentLesson.id));
      if (currentAbsIndex < flatLessons.length - 1) {
        goToAbsIndex(currentAbsIndex + 1);
      }
    } catch (e) {
      console.error("Failed to mark lesson completed", e);
    }
  };

  const courseId = courseData?.course?.id;
  const handleCompleteCourse = async () => {
    if (!courseId) return;
    try {
      // ensure the last lesson is marked completed first
      if (
        currentLesson?.id &&
        !isLessonDone(currentLesson) &&
        !completedIds.has(currentLesson.id)
      ) {
        await markLessonAsCompleted({ lessonId: currentLesson.id }).unwrap();
        setCompletedIds((prev) => new Set(prev).add(currentLesson.id));
      }
      await markCourseAsCompleted({ courseId }).unwrap();
      // optionally: navigate or show toast
      console.log("Course marked as completed");
    } catch (e) {
      console.error("Failed to mark course completed", e);
    }
  };

  if (isLoading) {
    return (
      <PageLayout paddingSize="none">
        <div className="flex items-center justify-center h-[90vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout paddingSize="none">
        <div className="text-center py-12 h-[90vh]">
          <h2 className="text-xl font-semibold mb-2">Error loading course</h2>
          <p className="text-muted-foreground">
            There was an error loading the course. Please try again later.
          </p>
        </div>
      </PageLayout>
    );
  }

  if (!courseData) {
    return (
      <PageLayout paddingSize="none">
        <div className="text-center py-12 h-[90vh]">
          <h2 className="text-xl font-semibold mb-2">Course not found</h2>
          <p className="text-muted-foreground">
            The requested course could not be loaded.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout paddingSize="none">
      {/* Header with back button */}
      {/* <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to My Learning
        </Button>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Video Player */}
          <Card className="aspect-video bg-black rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              {currentLesson ? (
                <VideoPlayer
                  lesson={currentLesson}
                  poster={courseData?.course?.courseThumbnail}
                />
              ) : (
                <div className="text-center">
                  <Play className="h-16 w-16 text-white mx-auto mb-2" />
                  <p className="text-white">Select a lesson to begin</p>
                </div>
              )}
            </div>
          </Card>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              {userRole !== "COMPANY" && (
                <NavigationControls
                  canPrev={currentAbsIndex > 0}
                  onPrev={handlePrevLesson}
                  isLast={
                    currentAbsIndex >= 0 &&
                    currentAbsIndex === flatLessons.length - 1
                  }
                  onNext={handleNextLesson}
                  onCompleteCourse={handleCompleteCourse}
                  nextDisabled={
                    currentAbsIndex === -1 ||
                    currentAbsIndex >= flatLessons.length - 1 ||
                    isMarking
                  }
                  completingCourse={isCompletingCourse}
                  markingLesson={isMarking}
                />
              )}
            </div>
            <div className="mt-4 p-6 border rounded-lg">
              <TabsContent value="overview">
                <div className="space-y-8">
                  {/* Course Description */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">
                      About This Course
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {courseData?.course?.courseDescription ||
                          "No description available"}
                      </p>
                    </div>
                  </div>

                  {/* Instructor Information */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      Your Instructor
                    </h2>
                    <Card className="p-6">
                      <div className="flex items-start space-x-6">
                        <div className="shrink-0">
                          <Image
                            src={
                              courseData?.course?.instructorImage ||
                              "/placeholder-avatar.png"
                            }
                            alt={
                              courseData?.course?.instructorName || "Instructor"
                            }
                            className="w-20 h-20 rounded-full object-cover"
                            width={80}
                            height={80}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">
                              {courseData?.course?.instructorName ||
                                "Unknown Instructor"}
                            </h3>
                          </div>
                          <p className="text-primary font-medium mb-3">
                            {courseData?.course?.instructorDesignation ||
                              "Course Instructor"}
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            {courseData?.course?.instructorDescription ||
                              "Experienced professional in the field"}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {courseData?.course?.totalLessons || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Lessons
                      </div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {courseData?.course?.totalSections || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Sections
                      </div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {courseData?.course?.courseLevel || "Beginner"}
                      </div>
                      <div className="text-sm text-muted-foreground">Level</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {courseData?.course?.difficulty || "Easy"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Difficulty
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Course Modules</h2>
                    <div className="text-sm text-muted-foreground">
                      {courseData?.course?.Section?.length || 0} modules
                    </div>
                  </div>
                  <div className="space-y-3">
                    {courseData?.course?.Section?.map((section) => (
                      <Card
                        key={section.id}
                        className={`border transition-all duration-200 ${
                          selectedSection === section.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "hover:bg-muted/30"
                        }`}
                      >
                        <div
                          className={`p-4 cursor-pointer ${
                            selectedSection === section.id
                              ? "bg-primary/10"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() => setSelectedSection(section.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {selectedSection === section.id ? (
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                              ) : (
                                <div className="h-2 w-2 rounded-full bg-muted-foreground/30"></div>
                              )}
                              <h3
                                className={`font-medium ${
                                  selectedSection === section.id
                                    ? "text-primary"
                                    : "text-foreground"
                                }`}
                              >
                                {section.title}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-2">
                              {selectedSection === section.id && (
                                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                                  Active
                                </span>
                              )}
                              <ChevronRight
                                className={`h-4 w-4 transition-transform ${
                                  selectedSection === section.id
                                    ? "text-primary rotate-90"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </div>
                          </div>
                          <div
                            className={`text-sm mt-2 flex items-center justify-between ${
                              selectedSection === section.id
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            <span>
                              {
                                (section.Lesson || []).filter((l) =>
                                  isLessonDone(l)
                                ).length
                              }{" "}
                              of {(section.Lesson || []).length} lessons
                              completed
                            </span>
                            <span className="text-xs">
                              Module {section.order}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <LearningSidebar
            sections={courseData?.course?.Section}
            selectedSectionId={selectedSection}
            currentLesson={currentLesson}
            onSelectLesson={(l) => setCurrentLesson(l)}
            isLessonDone={isLessonDone}
            completedIds={completedIds}
            lessonIndexMap={lessonIndexMap}
            currentAbsIndex={
              userRole === "COMPANY" ? flatLessons.length : currentAbsIndex
            }
            progressPercent={progressPercent}
            onSectionChange={setSelectedSection}
            userRole={userRole}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default MyLearningDetailsPage;
