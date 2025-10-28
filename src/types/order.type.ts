
export type IInvoice = {
    Seller?: string | null;
    Email?: string | null;
    NIP?: string | null;
    "Contact Number"?: string | null;
    Address?: string | null;
    Buyer?: string | null;
    "Buyer Email"?: string | null;
    "Buyer NIP"?: string | null;
    "Buyer Contact Number"?: string | null;
    "Buyer Address"?: string | null;
    "Invoice Number"?: string | null;
    "Invoice Date"?: string | null;
    "Course(s) Purchased"?: string | null;
    "Course ID(s)"?: string | null;
    "Course Price(s)"?: string | null;
    "Course vat rate(s) included "?: string | null;
    "Total Amount"?: string | null;
    [key: string]: string | null | undefined;
};

export type IOrder = {
    id: string;
    courseId: string;
    paymentStatus: "COMPLETED" | "PENDING" | "FAILED" | string;
    enrolledAt: string; // ISO date string
    invoice?: IInvoice | null;
    invoiceId?: string | null;
    courseTitle: string;
    coursePrice: number;
    courseLevel: string;
    categoryName: string;
    courseThumbnail: string;
};
