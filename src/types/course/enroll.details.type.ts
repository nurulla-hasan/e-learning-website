// Lesson and Test interfaces
export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  content: string;
  order: number;
  videoDuration: number | null;
  contentType: string;
  completed?: boolean;
  locked?: boolean;
}

export interface Test {
  id: string;
  title: string;
}

// Section interface
export interface Section {
  id: string;
  title: string;
  order: number;
  totalLength: number;
  totalLessons: number;
  testCount: number;
  Lesson: Lesson[];
  Test: Test[];
  courseId?: string;
}

// Course interface
export interface Course {
  id: string;
  courseTitle: string;
  courseShortDescription: string;
  courseDescription: string;
  courseLevel: string;
  categoryId: string;
  price: number;
  discountPrice: number;
  instructorName: string;
  instructorImage: string;
  instructorDesignation: string;
  instructorDescription: string;
  courseThumbnail: string;
  totalLessons: number;
  totalSections: number;
  totalDuration: number;
  difficulty: string;
  skillLevel: string;
  Section?: Section[];
}

// EnrolledCourse interface
export interface EnrolledCourse {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  paymentStatus: string;
  isCompleted: boolean;
  enrolledAt: string;
  course: Course;
  progressPercentage: number;
  currentLesson?: {
    id: string;
    title: string;
  } | null;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// Course List Item (for listing pages)
export interface CourseListItem {
  id: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  instructor: string;
  price: number;
  discountPrice?: number;
  rating: number;
  totalStudents: number;
  totalLessons: number;
  duration: number;
  category: string;
  level: string;
}
