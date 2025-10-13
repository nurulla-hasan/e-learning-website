import About from "@/components/about/About"
import PageHeader from "@/components/common/PageHeader"
import { getTranslations } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

const AboutPage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.about");

  return (
    <>
      <div className="min-h-screen bg-background">
        <PageHeader title={title} />
        <About/>
      </div>
    </>
  )
}

export default AboutPage