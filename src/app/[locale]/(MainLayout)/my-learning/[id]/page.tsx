"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ChevronRight, Play, Check, Lock, Video, FileImage } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import PageLayout from "@/tools/PageLayout";
import { useGetEnrolledCourseByIdQuery } from "@/redux/feature/course/courseApi";
import type {
  EnrolledCourse,
  Lesson,
} from "@/types/course/enroll.details.type";

const MyLearningDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [selectedSection, setSelectedSection] = React.useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = React.useState("overview");
  const [currentLesson, setCurrentLesson] = React.useState<Lesson | null>(null);

  const {
    data: response,
    isLoading,
    isError,
  } = useGetEnrolledCourseByIdQuery(id);
  const courseData = response?.data as EnrolledCourse | undefined;

  // Set the first section and lesson when data is loaded
  React.useEffect(() => {
    if (courseData?.course?.Section?.length) {
      setSelectedSection(courseData.course.Section[0]?.id || null);
      const firstLesson = courseData.course.Section[0]?.Lesson?.[0];
      if (firstLesson) {
        setCurrentLesson(firstLesson);
      }
    }
  }, [courseData]);

  if (isLoading) {
    return (
      <PageLayout paddingSize="none">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout paddingSize="none">
        <div className="text-center py-12">
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
        <div className="text-center py-12">
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
              {currentLesson?.content ? (
                currentLesson.contentType?.startsWith('image/') ? (
                  // Image content
                  <Image
                    src={currentLesson.content}
                    alt={currentLesson.title || "Lesson image"}
                    className="w-full h-full object-contain"
                    width={800}
                    height={600}
                  />
                ) : currentLesson.contentType?.startsWith('video/') ? (
                  // Video content
                  <video
                    src={currentLesson.content}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    poster={courseData?.course?.courseThumbnail}
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    onError={() => {
                      console.error('Video failed to load:', currentLesson.content);
                      // Fallback to placeholder or show error message
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  // Unknown content type - show as image
                  <Image
                    src={currentLesson.content}
                    alt={currentLesson.title || "Lesson content"}
                    className="w-full h-full object-contain"
                    width={800}
                    height={600}
                  />
                )
              ) : (
                <div className="text-center">
                  <Play className="h-16 w-16 text-white mx-auto mb-2" />
                  <p className="text-white">
                    {currentLesson?.title || "Select a lesson to begin"}
                  </p>
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
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <div className="mt-4 p-6 border rounded-lg">
              <TabsContent value="overview">
                <div className="space-y-8">
                  {/* Course Description */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">About This Course</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {courseData?.course?.courseDescription || "No description available"}
                      </p>
                    </div>
                  </div>

                  {/* Instructor Information */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Your Instructor</h2>
                    <Card className="p-6">
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <Image
                            src={courseData?.course?.instructorImage || "/placeholder-avatar.png"}
                            alt={courseData?.course?.instructorName || "Instructor"}
                            className="w-20 h-20 rounded-full object-cover"
                            width={80}
                            height={80}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">
                              {courseData?.course?.instructorName || "Unknown Instructor"}
                            </h3>
                          </div>
                          <p className="text-primary font-medium mb-3">
                            {courseData?.course?.instructorDesignation || "Course Instructor"}
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            {courseData?.course?.instructorDescription || "Experienced professional in the field"}
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
                      <div className="text-sm text-muted-foreground">Lessons</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {courseData?.course?.totalSections || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Sections</div>
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
                      <div className="text-sm text-muted-foreground">Difficulty</div>
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
                              <h3 className={`font-medium ${
                                selectedSection === section.id
                                  ? "text-primary"
                                  : "text-foreground"
                              }`}>
                                {section.title}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-2">
                              {selectedSection === section.id && (
                                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                                  Active
                                </span>
                              )}
                              <ChevronRight className={`h-4 w-4 transition-transform ${
                                selectedSection === section.id
                                  ? "text-primary rotate-90"
                                  : "text-muted-foreground"
                              }`} />
                            </div>
                          </div>
                          <div className={`text-sm mt-2 flex items-center justify-between ${
                            selectedSection === section.id
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}>
                            <span>
                              {
                                (section.Lesson || []).filter((l) => l?.completed)
                                  .length
                              }{" "}
                              of {(section.Lesson || []).length} lessons completed
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
        <div className="lg:col-span-1 space-y-4 sticky top-22 max-h-[90vh] overflow-y-auto">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Course Content</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress: {courseData?.progress || 0}%</span>
                <span className="text-muted-foreground">
                  {courseData?.course?.Section?.flatMap(
                    (s) => s?.Lesson || []
                  ).filter((l) => l?.completed).length || 0}
                  /
                  {courseData?.course?.Section?.flatMap((s) => s?.Lesson || [])
                    .length || 0}{" "}
                  lessons
                </span>
              </div>
              <Progress value={courseData.progress} className="h-2" />
            </div>
          </Card>

          {selectedSection && (
            <Card className="overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold">
                  {
                    courseData?.course?.Section?.find(
                      (s) => s.id === selectedSection
                    )?.title
                  }
                </h3>
              </div>
              <div className="divide-y max-h-96 overflow-y-auto">
                {courseData?.course?.Section?.find(
                  (s) => s.id === selectedSection
                )?.Lesson.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center p-3 text-sm cursor-pointer ${
                      lesson.id === currentLesson?.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted/30"
                    }`}
                    onClick={() => {
                      setCurrentLesson(lesson);
                      // Removed setActiveTab("overview") - let users stay on current tab
                    }}
                  >
                    <div className="flex-1 flex items-center">
                      {lesson.completed ? (
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                      ) : lesson.locked ? (
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-3">
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        </div>
                      ) : lesson.contentType?.startsWith('image/') ? (
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <FileImage className="h-3 w-3 text-blue-600" />
                        </div>
                      ) : lesson.contentType?.startsWith('video/') ? (
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Video className="h-3 w-3 text-primary" />
                        </div>
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Play className="h-3 w-3 text-primary" />
                        </div>
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {lesson.videoDuration
                        ? `${Math.floor(lesson.videoDuration / 60)}:${(
                            lesson.videoDuration % 60
                          )
                            .toString()
                            .padStart(2, "0")}`
                        : "--:--"}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default MyLearningDetailsPage;
