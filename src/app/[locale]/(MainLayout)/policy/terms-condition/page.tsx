"use client";

import PageHeader from "@/components/common/PageHeader";
import PageLayout from "@/tools/PageLayout";
import { useTranslations } from "next-intl";

const TermsConditionPage = () => {
  const t = useTranslations();
  const title = t("Header.terms");

  return (
    <>
      <div className="min-h-screen bg-background">
        <PageHeader title={title} />
        <PageLayout paddingSize="none">
          <div>
            {/* Terms and conditions content will go here */}
          </div>
        </PageLayout>
      </div>
    </>
  );
};

export default TermsConditionPage;
