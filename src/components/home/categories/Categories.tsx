"use client";
import {
  Briefcase,
  Palette,
  Code,
  Megaphone,
  LucideHeartPulse,
} from "lucide-react";
import CategoryItem from "./CategoryItem";
import { useTranslations } from "next-intl";

const Categories = () => {
  const t = useTranslations("HomePage");
  const categories = [
    { icon: Briefcase, title: t("categories.business_development"), name: "Business Development" },
    { icon: Palette, title: t("categories.art_design"), name: "Art & Design" },
    { icon: Code, title: t("categories.it_software"), name: "IT & Software" },
    { icon: LucideHeartPulse, title: t("categories.health_fitness"), name: "Health & Fitness" },
    { icon: Megaphone, title: t("categories.digital_marketing"), name: "Digital Marketing" },
  ];

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-title text-center mb-12">
          {t("our_top_categories")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              icon={category.icon}
              title={category.title}
              name={category.name}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Categories;
