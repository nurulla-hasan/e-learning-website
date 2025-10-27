"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Lock, Video, FileImage, Play } from "lucide-react";
import type { Lesson, Section } from "@/types/course/enroll.details.type";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import ConfirmationModal from "@/components/modal/ConfirmationModal";

interface Props {
  sections: Section[] | undefined;
  selectedSectionId: string | null;
  onSelectSection: (id: string) => void;
  currentLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
  isLessonDone: (l: Lesson) => boolean;
  completedIds: Set<string>;
  lessonIndexMap: Record<string, number>;
  currentAbsIndex: number;
  progressPercent: number;
  courseId?: string;
}

const LearningSidebar: React.FC<Props> = ({
  sections,
  selectedSectionId,
  onSelectSection,
  currentLesson,
  onSelectLesson,
  isLessonDone,
  completedIds,
  lessonIndexMap,
  currentAbsIndex,
  progressPercent,
  courseId,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTest, setSelectedTest] = React.useState<any>(null);

  const handleStartTest = (test: any) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const handleConfirmTest = () => {
    if (selectedTest) {
      router.push(`/test-exam/${selectedTest.id}`);
    }
    setIsModalOpen(false);
  };

  const selectedSection = sections?.find((s) => s.id === selectedSectionId);
  const lastSectionId = React.useMemo(() => {
    if (!sections || sections.length === 0) return null;
    // choose the section with the highest order, fallback to last index
    const byOrder = [...sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return (byOrder[byOrder.length - 1] || sections[sections.length - 1]).id;
  }, [sections]);
  const isLastSection = selectedSection?.id && lastSectionId ? selectedSection.id === lastSectionId : false;
  const allLessonsCompleted = React.useMemo(() => {
    const list = sections?.flatMap((s) => s?.Lesson || []) || [];
    if (list.length === 0) return false;
    return list.every((l) => isLessonDone(l) || completedIds.has(l.id));
  }, [sections, isLessonDone, completedIds]);

  return (
    <div className="space-y-4 sticky top-22 max-h-[90vh] overflow-y-auto">
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Course Content</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Progress: {progressPercent || 0}%</span>
            <span className="text-muted-foreground">
              {sections?.flatMap((s) => s?.Lesson || []).filter((l) => isLessonDone(l)).length || 0}
              /
              {sections?.flatMap((s) => s?.Lesson || []).length || 0}{" "}
              lessons
            </span>
          </div>
          <Progress value={progressPercent || 0} className="h-2" />
        </div>
      </Card>

      {selectedSection && (
        <Card className="overflow-hidden p-0">
          <div className="p-4 border-b">
            <h3 className="font-semibold">{selectedSection.title}</h3>
          </div>
          <div className="divide-y max-h-96 overflow-y-auto">
            {selectedSection.Lesson.map((lesson) => {
              const isLocked =
                !isLessonDone(lesson) &&
                !completedIds.has(lesson.id) &&
                (lessonIndexMap[lesson.id] ?? 0) > currentAbsIndex;

              return (
                <div
                  key={lesson.id}
                  className={`flex items-center p-3 text-sm ${
                    isLocked ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                  } ${
                    lesson.id === currentLesson?.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted/30"
                  }`}
                  onClick={() => {
                    if (isLocked) return;
                    onSelectLesson(lesson);
                  }}
                >
                  <div className="flex-1 flex items-center">
                    {isLessonDone(lesson) || completedIds.has(lesson.id) ? (
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                    ) : isLocked ? (
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-3">
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      </div>
                    ) : lesson.contentType?.startsWith("image/") ? (
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <FileImage className="h-3 w-3 text-blue-600" />
                      </div>
                    ) : lesson.contentType?.startsWith("video/") ? (
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
                      ? `${Math.floor(lesson.videoDuration / 60)}:${(lesson.videoDuration % 60)
                          .toString()
                          .padStart(2, "0")}`
                      : "--:--"}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="p-4 space-y-2">
            <h4 className="font-semibold">Tests</h4>
            {selectedSection.Test?.map((test) => (
              <div key={test.id} className="flex items-center justify-between">
                <span className="text-sm">{test.title}</span>
                <Button
                  size="sm"
                  onClick={() => handleStartTest(test)}
                >
                  Start Test
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmTest}
        title="Start Test"
        description="Are you sure you want to start the test? You can only attempt this test once."
      />
    </div>
  );
};

export default LearningSidebar;
