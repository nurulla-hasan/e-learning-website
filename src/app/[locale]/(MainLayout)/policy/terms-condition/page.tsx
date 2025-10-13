import PageHeader from "@/components/common/PageHeader"
import TermsCondition from "@/components/policy/TermsConditon";
import { getTranslations } from "next-intl/server";


interface TProps {
  params: {
    locale: string;
  };
}

const TermsConditionPage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.terms");
  return (
    <>
      <div className="min-h-screen bg-background">
        <PageHeader title={title} />
        <TermsCondition/>
      </div>
    </>
  )
}

export default TermsConditionPage