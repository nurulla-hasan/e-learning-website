import PageHeader from "@/components/common/PageHeader";
import OrdersTable from "@/components/order/OrdersTable";
import OrderTitle from "@/components/order/OrderTitle";
import { getTranslations } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

const OrdersPage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.orders");


  return (
    <>
      <section className="min-h-screen">
         <PageHeader title={title}/>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <OrderTitle/>
            <OrdersTable />
          </div>
        </div>
      </section>
    </>
  )
}

export default OrdersPage;
