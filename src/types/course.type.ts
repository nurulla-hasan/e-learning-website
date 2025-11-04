export interface IPopularCourse {
  id: string;
  userId: string;
  courseTitle: string;
  courseShortDescription: string;
  courseDescription: string;
  courseLevel: string;
  categoryId: string;
  categoryName: string;
  certificate: boolean;
  lifetimeAccess: boolean;
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
  avgRating: number;
  totalRatings: number;
  totalEnrollments: number;
  isPublished: boolean;
  lastUpdated: string;
  difficulty: string;
  skillLevel: string;
  courseLength: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  courseTitle: string;
  courseShortDescription: string;
  courseDescription: string;
  courseLevel: string;
  price: number;
  discountPrice: number;
  courseThumbnail: string;
  avgRating: number;
  totalRatings: number;
  categoryName: string;
  instructorName: string;
  instructorImage: string;
  totalLessons: number;
  totalDuration: number;
  isBookmarked: boolean;
}

export interface IFavoriteCourse {
  id: number;
  title: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  description: string;
  isFavorited: boolean;
}

export interface Review {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
  userImage: string;
}

export type ILearningCourse = {
  id: string;
  courseId: string;
  paymentStatus: string;
  enrolledAt: string;
  courseTitle: string;
  courseShortDescription: string;
  courseLevel: string;
  coursePrice: number;
  discountPrice: number;
  instructorName: string;
  courseThumbnail: string;
  certificate: boolean;
  lifetimeAccess: boolean;
  totalSections: number;
  totalLessons: number;
  totalDuration: number;
  categoryName: string;
  progress: {
    courseId: string;
    courseTitle: string;
    progressPercentage: number;
    progress: {
      overallProgress: number;
      completedLessons: number;
      totalLessons: number;
    };
  };
  isCompleted: boolean;
};

export type THistoryCourse = {
  id: string;
  name: string;
  thumbnail: string;
  status: "Completed" | "In Progress" | "Not Started"; // better as a union type
  completedOn: string; // could also be Date if you parse it
  certificateUrl: string;
};
