"use client";

import { useTranslations } from "next-intl";
import PageHeader from "@/components/common/PageHeader";
import PageLayout from "@/tools/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingRequestsTab from "@/components/training/PendingRequestsTab";
import AcceptedRequestsTab from "@/components/training/AcceptedRequestsTab";

export default function TrainingRequestPage() {
  const t = useTranslations("TrainingRequest");

  return (
    <div className="min-h-screen">
      <PageHeader title={t("training_requests")} />
      <PageLayout paddingSize="none">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="pending">{t("pending_requests")}</TabsTrigger>
            <TabsTrigger value="accepted">{t("accepted_requests")}</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <PendingRequestsTab/>
          </TabsContent>

          <TabsContent value="accepted" className="mt-6">
            <AcceptedRequestsTab/>
          </TabsContent>
        </Tabs>
      </PageLayout>
    </div>
  );
}
