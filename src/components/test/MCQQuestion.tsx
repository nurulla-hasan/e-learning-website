
import { IQuestion } from "@/types/test.type";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  question: IQuestion;
  onAnswerChange: (questionId: string, questionType: string, selectedOptions: string[]) => void;
}

const MCQQuestion: React.FC<Props> = ({ question, onAnswerChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckedChange = (optionId: string) => {
    const newSelectedOptions = [...selectedOptions];
    const index = newSelectedOptions.indexOf(optionId);

    if (index === -1) {
      newSelectedOptions.push(optionId);
    } else {
      newSelectedOptions.splice(index, 1);
    }

    setSelectedOptions(newSelectedOptions);
    onAnswerChange(question.id, question.type, newSelectedOptions);
  };

  return (
    <div>
      {question.options.map((option) => (
        <div key={option.id} className="flex items-center mb-2">
          <Checkbox
            id={option.id}
            onCheckedChange={() => handleCheckedChange(option.id)}
            className="mr-2"
          />
          <label htmlFor={option.id}>{option.text}</label>
        </div>
      ))}
    </div>
  );
};

export default MCQQuestion;
