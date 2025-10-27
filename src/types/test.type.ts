export interface IQuestionOption {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface IQuestion {
  id: string;
  testId: string;
  title: string;
  description: string;
  type: "MCQ" | "TRUE_FALSE" | "SHORT_ANSWER";
  marks: number;
  explanation: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  options: IQuestionOption[];
}

export interface ITest {
  id: string;
  userId: string;
  sectionId: string;
  title: string;
  description: string;
  passingScore: number;
  totalMarks: number;
  timeLimit: number;
  isActive: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  questions: IQuestion[];
}
