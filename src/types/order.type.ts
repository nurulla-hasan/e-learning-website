
export type IOrder = {
    id: string;
    courseId: string;
    paymentStatus: "COMPLETED" | "PENDING" | "FAILED" | string;
    enrolledAt: string; // ISO date string
    invoiceId: string | null;
    courseTitle: string;
    coursePrice: number;
    courseLevel: string;
    categoryName: string;
    courseThumbnail: string;
};
