"use client";

import PageHeader from "@/components/common/PageHeader";
import LearningCourseList from "@/components/learning/LearningCourseList";
import { useTranslations } from "next-intl";

const MyLearningPage = () => {
  const t = useTranslations();
  const title = t("Header.learning");

  return (
    <>
      <main className="min-h-screen">
        <PageHeader title={title} />
        <LearningCourseList />
      </main>
    </>
  );
};

export default MyLearningPage;
