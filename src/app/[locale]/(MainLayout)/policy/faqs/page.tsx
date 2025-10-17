"use client";

import PageHeader from "@/components/common/PageHeader";
import FaqList from "@/components/faq/FaqList";
import PageLayout from "@/tools/PageLayout";
import { useTranslations } from "next-intl";

const FaqsPage = () => {
  const t = useTranslations();
  const title = t("Header.faqs");

  return (
    <>
      <div className="min-h-screen bg-background">
        <PageHeader title={title} />
        <PageLayout paddingSize="none">
          <FaqList />
        </PageLayout>
      </div>
    </>
  );
};

export default FaqsPage;