import Cart from "@/components/cart/Cart"
import PageHeader from "@/components/common/PageHeader"
import { getTranslations } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

const CartPage = async ({ params }: TProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("Header.cart");

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={title}/>
      <Cart/>
    </div>
  )
}


export default CartPage