"use client";
import { Briefcase, Palette, Code, Megaphone, LucideHeartPulse } from "lucide-react"
import CategoryItem from "./CategoryItem"
import { useTranslations } from "next-intl";

const Categories = () => {
  const t = useTranslations("HomePage")
  const categories = [
    { icon: Briefcase, title: "Business Development" },
    { icon: Palette, title: "Art & Design" },
    { icon: Code, title: "IT & Software" },
    { icon: LucideHeartPulse, title: "Health & Fitness" },
    { icon: Megaphone, title: "Digital Marketing" },
  ]

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-title text-center mb-12">{t("our_top_categories")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {categories.map((category, index) => (
            <CategoryItem key={index} icon={category.icon} title={category.title} />
          ))}
        </div>
      </section>
    </>
  )
}


export default Categories;