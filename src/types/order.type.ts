
export type IOrder = {
    id: string;
    courseName: string;
    courseImage: string;
    date: string; // could also be Date if parsed
    amount: number;
    status: "Paid" | "Pending" | "Failed"; // union type for better type safety
    hasInvoice: boolean;
};
