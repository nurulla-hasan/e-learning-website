"use client";

import { useTranslations } from "next-intl";

const OrderTitle = () => {
    const t = useTranslations("OrdersPage")

    return (
        <>
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
                <p className="text-muted-foreground">{t("subtitle")}</p>
            </div>
        </>
    )
}

export default OrderTitle