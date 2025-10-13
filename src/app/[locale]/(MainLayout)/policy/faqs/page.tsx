import PageHeader from "@/components/common/PageHeader"
import FaqList from "@/components/faq/FaqList";
import { getTranslations } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

const FaqsPage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.faqs");

  return (
    <>
      <div className="min-h-screen bg-background">
        <PageHeader title={title} />
        <FaqList/>
      </div>
    </>
  )
}

export default FaqsPage;