import PageHeader from "@/components/common/PageHeader"
import PrivacyPolicy from "@/components/policy/PrivacyPolicy"
import { getTranslations } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

const PrivacyPolicyPage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.privacy");

  return (
    <>
      <div className="min-h-screen bg-background">
        <PageHeader title={title} />
        <PrivacyPolicy/>
      </div>
    </>
  )
}

export default PrivacyPolicyPage