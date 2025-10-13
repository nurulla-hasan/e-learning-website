import Checkout from "@/components/checkout/Checkout"
import PageHeader from "@/components/common/PageHeader"
import { getTranslations } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

const CheckoutPage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.checkout");

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={title}/>
      <Checkout/>
    </div>
  )
}


export default CheckoutPage