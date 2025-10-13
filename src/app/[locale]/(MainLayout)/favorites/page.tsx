import PageHeader from "@/components/common/PageHeader"
import FavouriteCourseCard from "@/components/favorite/FavouriteCourseCard"
import { favoriteCourses } from "@/data/course.data"
import { getTranslations } from "next-intl/server";


interface TProps {
  params: {
    locale: string;
  };
}

const FavoritesPage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.favorites");

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={title}/>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteCourses?.map((course, index) => (
            <FavouriteCourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}


export default FavoritesPage