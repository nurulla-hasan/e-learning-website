"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Lock, Video, FileImage, Play } from "lucide-react";
import type { Lesson, Section } from "@/types/course/enroll.details.type";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import ConfirmationModal from "@/components/modal/ConfirmationModal";

interface Test {
  id: string;
  title: string;
  // Add other test properties as needed
}

interface Props {
  sections: Section[] | undefined;
  selectedSectionId: string | null;
  currentLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
  isLessonDone: (l: Lesson) => boolean;
  completedIds: Set<string>;
  lessonIndexMap: Record<string, number>;
  currentAbsIndex: number;
  progressPercent: number;
  onSectionChange: (sectionId: string) => void;
  userRole: string | null;
}

const LearningSidebar: React.FC<Props> = ({
  sections,
  selectedSectionId,
  currentLesson,
  onSelectLesson,
  isLessonDone,
  completedIds,
  lessonIndexMap,
  currentAbsIndex,
  progressPercent,
  onSectionChange,
  userRole,
}) => {
  const router = useRouter();
  const t = useTranslations("MyLearning.sidebar");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTest, setSelectedTest] = React.useState<Test | null>(null);

  const handleStartTest = (test: Test) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const handleConfirmTest = () => {
    if (selectedTest) {
      router.push(`/test-exam/${selectedTest.id}`);
    }
    setIsModalOpen(false);
  };

  const selectedSection = React.useMemo(() => {
    return (
      sections?.find((s) => s.id === selectedSectionId) ||
      (sections?.length ? sections[0] : null)
    );
  }, [sections, selectedSectionId]);

  // Handle section selection
  const handleSectionSelect = (sectionId: string) => {
    onSectionChange(sectionId);
  };

  const progressValue = progressPercent ?? 0;
  const completedLessons =
    sections
      ?.flatMap((s) => s?.Lesson || [])
      .filter((lesson) => isLessonDone(lesson)).length || 0;
  const totalLessons =
    sections?.flatMap((s) => s?.Lesson || []).length ?? 0;

  return (
    <div className="space-y-4 sticky top-22 max-h-[90vh] overflow-y-auto">
      <Card className="p-4">
        <h3 className="font-semibold mb-3">{t("title")}</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>{t("progress_label", { value: progressValue })}</span>
            <span className="text-muted-foreground">
              {t("progress_summary", {
                completed: completedLessons,
                total: totalLessons,
              })}
            </span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>
      </Card>

      {selectedSection && (
        <Card className="overflow-hidden p-0">
          <div className="p-4 border-b">
            <select
              className="w-full font-semibold bg-transparent border-none focus:ring-0 focus:ring-offset-0"
              value={selectedSection?.id || ""}
              onChange={(e) => handleSectionSelect(e.target.value)}
            >
              {sections?.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
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
                    isLocked
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
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
                      ? `${Math.floor(lesson.videoDuration / 60)}:${(
                          lesson.videoDuration % 60
                        )
                          .toString()
                          .padStart(2, "0")}`
                      : "--:--"}
                  </span>
                </div>
              );
            })}
          </div>
          {selectedSection.Test?.length > 0 ? (
            <div className="p-4 space-y-2">
              <h4 className="font-semibold">{t("tests.title")}</h4>
              {selectedSection.Test?.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm">{test.title}</span>
                  {userRole !== "COMPANY" && (
                    <Button size="sm" onClick={() => handleStartTest(test)}>
                      {t("tests.start_button")}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 space-y-2">
              <h4 className="font-semibold">{t("tests.title")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("tests.empty")}
              </p>
            </div>
          )}
        </Card>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmTest}
        title={t("tests.modal_title")}
        description={t("tests.modal_description")}
      />
    </div>
  );
};

export default LearningSidebar;
