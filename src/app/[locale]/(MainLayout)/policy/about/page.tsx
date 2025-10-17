"use client";

import PageHeader from "@/components/common/PageHeader";
import PageLayout from "@/tools/PageLayout";
import { useTranslations } from "next-intl";
import Error from "@/tools/Error";
import NoData from "@/tools/NoData";
import { useGetAboutQuery } from "@/redux/feature/legal/legalApi";

const AboutPage = () => {
  const t = useTranslations();
  const title = t("Header.about");

  const { data: about, isLoading, isError } = useGetAboutQuery({});

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen">
          <PageHeader title={title} />
          <PageLayout paddingSize="none">
            <div className="animate-pulse space-y-6">
              {/* Title skeleton */}
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>

              {/* Date skeleton */}
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>

              {/* Content skeleton */}
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>

              {/* More content paragraphs */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-3/5"></div>
              </div>

              {/* Footer skeleton */}
              <div className="pt-8 border-t border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </PageLayout>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <PageHeader title={title} />
        <PageLayout paddingSize="none">
          {isError ? (
            <Error msg="Something went wrong" />
          ) : about === null || about === undefined ? (
            <NoData msg="No data found" />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: about?.data?.content,
              }}
            />
          )}
        </PageLayout>
      </div>
    </>
  );
};

export default AboutPage;
