export interface LearningHistoryItem {
  id: string;
  courseId: string;
  courseTitle: string;
  courseShortDescription: string;
  courseLevel: string;
  instructorName: string;
  courseThumbnail: string;
  totalSections: number;
  totalLessons: number;
  totalDuration: number;
  categoryName: string;
  paymentStatus: string;
  enrolledAt: string;
  isCompleted: boolean;
}
