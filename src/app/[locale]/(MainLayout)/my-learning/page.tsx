import PageHeader from "@/components/common/PageHeader"
import LearningCourseList from "@/components/learning/LearningCourseList"
import { getTranslations } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

const MyLearningPage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.learning");

  return (
    <>
      <main className="min-h-screen bg-background">
        <PageHeader title={title} />
        <LearningCourseList />
      </main>
    </>
  )
}

export default MyLearningPage