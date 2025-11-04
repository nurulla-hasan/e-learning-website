"use client";

import PageHeader from "@/components/common/PageHeader";
import CourseTable from "@/components/table/CourseTable";
import PageLayout from "@/tools/PageLayout";
import { useTranslations } from "next-intl";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetMyLearningHistoryQuery } from "@/redux/feature/profile/profileApi";
import CustomPagination from "@/tools/CustomPagination";
import { LearningHistoryItem } from "@/types/learning-history.type";

const LearningHistoryPage = () => {
  const tHeader = useTranslations("Header");
  const t = useTranslations("LearningHistory");
  const title = tHeader("history");

  const { currentPage, setCurrentPage, totalPages, items, isLoading, isError } =
    useSmartFetchHook(useGetMyLearningHistoryQuery);

  return (
    <main className="min-h-screen bg-background">
      <PageHeader title={title} />
      <PageLayout
        paddingSize="none"
        pagination={
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        }
      >
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <CourseTable
          items={items as LearningHistoryItem[]}
          isLoading={isLoading}
          isError={isError}
        />
      </PageLayout>
    </main>
  );
};

export default LearningHistoryPage;
