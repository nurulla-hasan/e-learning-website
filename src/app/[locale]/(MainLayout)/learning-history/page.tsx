import PageHeader from "@/components/common/PageHeader";
import CourseTable from "@/components/table/CourseTable";
import { getTranslations } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

const LearningHistoryPage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.history");

  return (
    <main className="min-h-screen bg-background">
      <PageHeader title={title}/>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">My Courses</h1>
          <p className="text-muted-foreground">Track your completed courses and certificates</p>
        </div>
        <CourseTable />
      </div>
    </main>
  )
}


export default LearningHistoryPage;