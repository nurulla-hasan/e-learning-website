
import { IQuestion } from "@/types/test.type";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  question: IQuestion;
  onAnswerChange: (questionId: string, questionType: string, selectedOptions: string[]) => void;
}

const TrueFalseQuestion: React.FC<Props> = ({ question, onAnswerChange }) => {
  return (
    <RadioGroup onValueChange={(value) => onAnswerChange(question.id, question.type, [value])}>
      {question.options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <RadioGroupItem value={option.id} id={option.id} />
          <Label htmlFor={option.id}>{option.text}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default TrueFalseQuestion;
