import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

type TSortingProps = {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
};

const CourseSorting = ({ sortBy, setSortBy }: TSortingProps) => {
  const t = useTranslations("CoursesPage");
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{t("sort_by")}</span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={t("sort_placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-low">{t("price_sort_low")}</SelectItem>
            <SelectItem value="price-high">{t("price_sort_high")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default CourseSorting;
