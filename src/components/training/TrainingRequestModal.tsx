"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useRequestForTrainingMutation } from "@/redux/feature/course/courseApi";
import { ErrorToast, SuccessToast } from "@/lib/utils";

interface TrainingRequestModalProps {
  courseId: string;
  courseName: string;
  children: React.ReactNode;
}

export function TrainingRequestModal({
  courseId,
  courseName,
  children,
}: TrainingRequestModalProps) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const t = useTranslations("TrainingRequest");

  const [requestForTraining, { isLoading }] = useRequestForTrainingMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestForTraining({
        courseId,
        location,
      });
      setOpen(false);
      setLocation("");
      SuccessToast("Training request submitted successfully");
    } catch {
      ErrorToast("Failed to submit training request");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t("request_training")}</DialogTitle>
            <DialogDescription>
              {t("request_training_description")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="courseName" className="text-sm font-medium">
                {t("course_name")}
              </Label>
              <Input
                id="courseName"
                value={courseName}
                disabled
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                {t("location")}
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t("enter_location")}
                className="w-full"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              {t("submit_request")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
