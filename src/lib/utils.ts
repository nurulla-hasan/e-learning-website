import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ErrorToast = (message: string) => {
  toast.error(message);
};

export const SuccessToast = (message: string) => {
  toast.success(message);
};

export const WarningToast = (message: string) => {
  toast.warning(message);
};