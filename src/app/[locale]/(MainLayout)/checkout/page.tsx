"use client";

import Checkout from "@/components/checkout/Checkout"
import PageHeader from "@/components/common/PageHeader"
import { useTranslations } from "next-intl";

const CheckoutPage = () => {
  const t = useTranslations();
  const title = t("Header.checkout");

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={title}/>
      <Checkout/>
    </div>
  )
}

export default CheckoutPage