"use client";

import PageHeader from "@/components/common/PageHeader";
import OrdersTable from "@/components/order/OrdersTable";
import OrderTitle from "@/components/order/OrderTitle";
import { useTranslations } from "next-intl";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetMyOrdersQuery } from "@/redux/feature/profile/profileApi";
import PageLayout from "@/tools/PageLayout";
import CustomPagination from "@/tools/CustomPagination";
import { IOrder } from "@/types/order.type";

const OrdersPage = () => {
  const t = useTranslations("Header");
  const title = t("orders");

  const { currentPage, setCurrentPage, totalPages, items, isLoading, isError } =
    useSmartFetchHook(useGetMyOrdersQuery);

  return (
    <>
      <section className="min-h-screen">
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
          <div className="space-y-6 mb-4">
            <OrderTitle />
            <OrdersTable
              items={items as IOrder[]}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </PageLayout>
      </section>
    </>
  );
};

export default OrdersPage;
