import React from "react";
import { Button } from "@/components/ui/button";

interface NavigationControlsProps {
  canPrev: boolean;
  onPrev: () => void;
  isLast: boolean;
  onNext: () => void;
  onCompleteCourse: () => void;
  nextDisabled: boolean;
  completingCourse: boolean;
  markingLesson: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  canPrev,
  onPrev,
  isLast,
  onNext,
  onCompleteCourse,
  nextDisabled,
  completingCourse,
  markingLesson,
}) => {
  return (
    <div className="space-x-2">
      <Button variant="outline" size="sm" onClick={onPrev} disabled={!canPrev}>
        Prev
      </Button>
      {isLast ? (
        <Button size="sm" onClick={onCompleteCourse} disabled={completingCourse}>
          {completingCourse ? "Completing..." : "Complete Course"}
        </Button>
      ) : (
        <Button size="sm" onClick={onNext} disabled={nextDisabled}>
          {markingLesson ? "Marking..." : "Next"}
        </Button>
      )}
    </div>
  );
};

export default NavigationControls;
