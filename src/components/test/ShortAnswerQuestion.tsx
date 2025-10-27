
import { IQuestion } from "@/types/test.type";
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  question: IQuestion;
  onAnswerChange: (questionId: string, questionType: string, selectedOptions: string[], shortAnswer?: string) => void;
}

const ShortAnswerQuestion: React.FC<Props> = ({ question, onAnswerChange }) => {
  return (
    <div>
      <Textarea
        rows={4}
        className="w-full p-2 border rounded"
        onChange={(e) => onAnswerChange(question.id, question.type, [], e.target.value)}
      />
    </div>
  );
};

export default ShortAnswerQuestion;
