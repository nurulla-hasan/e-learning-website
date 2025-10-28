"use client";

"use client";

import {
  useGetSingleTestQuery,
  useAttemptTestMutation,
} from "@/redux/feature/lesson/lessonApi";
import { IQuestion, ITest } from "@/types/test.type";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Loader2 } from "lucide-react";

interface ExamData extends ITest {
  questions: IQuestion[];
  // Other properties from ITest will be inherited
}

const TestExamPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading } = useGetSingleTestQuery(id);
  const [attemptTest, { isLoading: isSubmitting }] = useAttemptTestMutation();

  const testData = data?.data as ExamData | undefined;

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  // Extend IQuestion to include selectedOptions and shortAnswer
  interface Answer extends Omit<IQuestion, 'options'> {
    selectedOptions: string[];
    shortAnswer?: string;
  }

  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    if (testData?.timeLimit) {
      setTimeLeft(testData.timeLimit * 60);
    }
  }, [testData]);

  const handleSubmit = useCallback(async () => {
    if (!testData) return;
    
    const totalTimeSpent = testData.timeLimit - Math.floor((timeLeft || 0) / 60);
    const payload = {
      testId: id,
      responses: answers,
      totalTimeSpent,
    };

    try {
      await attemptTest(payload).unwrap();
      router.push("/test-result");
    } catch (error: unknown) {
      const errorMessage = error && 
        typeof error === 'object' && 
        'data' in error && 
        error.data && 
        typeof error.data === 'object' && 
        'message' in error.data
          ? String(error.data.message)
          : "An error occurred while submitting the test";
      SuccessToast(errorMessage);
    }
  }, [testData, timeLeft, answers, id, attemptTest, router]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(prev => prev ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, handleSubmit]);

  const handleAnswerChange = (
    questionId: string,
    questionType: string,
    selectedOptions: string[],
    shortAnswer?: string
  ) => {
    const existingAnswerIndex = answers.findIndex(
      (ans) => ans.id === questionId
    );
    const newAnswers = [...answers];

    if (existingAnswerIndex !== -1) {
      newAnswers[existingAnswerIndex] = {
        ...answers[existingAnswerIndex],
        id: questionId,
        type: questionType as 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER',
        selectedOptions,
        shortAnswer,
      };
    } else {
      newAnswers.push({
        id: questionId,
        type: questionType as 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER',
        selectedOptions,
        shortAnswer,
      } as Answer);
    }
    setAnswers(newAnswers);
  };


  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Loader2 className="animate-spin"/>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="p-6">
            <h1 className="text-3xl font-bold mb-5">{testData?.title}</h1>
            <div>
              {testData?.questions?.map((question: IQuestion) => (
                <div key={question.id} className="mb-8">
                  <h2 className="text-xl font-semibold mb-2">
                    {question.title}
                  </h2>
                  <p className="mb-4">{question.description}</p>
                  {/* Render question based on type */}
                  {question.type === "MCQ" && (
                    <MCQQuestion
                      question={question}
                      onAnswerChange={handleAnswerChange}
                    />
                  )}
                  {question.type === "TRUE_FALSE" && (
                    <TrueFalseQuestion
                      question={question}
                      onAnswerChange={handleAnswerChange}
                    />
                  )}
                  {question.type === "SHORT_ANSWER" && (
                    <ShortAnswerQuestion
                      question={question}
                      onAnswerChange={handleAnswerChange}
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div>
          <Card className="p-6 sticky top-24">
            <div className="flex items-center justify-center text-2xl font-bold mb-4">
              <Clock className="mr-2" />
              <span>{`${Math.floor((timeLeft || 0) / 60)}:${(
                (timeLeft || 0) % 60
              )
                .toString()
                .padStart(2, "0")}`}</span>
            </div>
            <div className="text-center mb-4">
              {testData?.questions?.length || 0} Questions
            </div>
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Test"}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

import MCQQuestion from "@/components/test/MCQQuestion";
import ShortAnswerQuestion from "@/components/test/ShortAnswerQuestion";
import TrueFalseQuestion from "@/components/test/TrueFalseQuestion";
import { SuccessToast } from "@/lib/utils";

export default TestExamPage;
