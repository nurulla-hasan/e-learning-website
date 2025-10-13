export interface IPopularCourse {
  id: number
  title: string
  currentPrice: number
  originalPrice: number
  rating: number
  description: string
  image: string
}


export type TCourse = {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | string;
};


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

export type ILearningCourse = {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
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

