import { ChevronDown, Filter, Star } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { categories, levels } from "@/data/course.data";
import { Checkbox } from "@/components/ui/checkbox";
import PriceRangeSlider from "./PriceRangeSlider";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";

type TProps = {
    selectedCategories: string[];
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    selectedLevels: string[];
    setSelectedLevels: Dispatch<SetStateAction<string[]>>
}

const FilterSidebar = ({selectedCategories, setSelectedCategories, selectedLevels, setSelectedLevels}: TProps) => {
     const t = useTranslations('CoursesPage');
    

    const handleCategoryChange = (category: string, checked: boolean) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, category])
        } else {
            setSelectedCategories(selectedCategories.filter((c) => c !== category))
        }
    }

    
  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels([...selectedLevels, level])
    } else {
      setSelectedLevels(selectedLevels.filter((l) => l !== level))
    }
  }


    return (
       <>
          <div className="w-full lg:w-80 bg-sidebar border-r border-sidebar-border p-6 space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5" />
                <h2 className="text-lg font-semibold">{t("filter_by")}</h2>
            </div>

            {/* Category Filter */}
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium">
                   {t("category_title")}
                    <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                                className="data-[state=checked]:border-[#46BEF2] data-[state=checked]:bg-[#46BEF2] data-[state=checked]:text-white dark:data-[state=checked]:border-[#46BEF2] dark:data-[state=checked]:bg-[#46BEF2]"
                            />
                            <label htmlFor={category} className="text-sm text-muted-foreground cursor-pointer">
                                {category}
                            </label>
                        </div>
                    ))}
                </CollapsibleContent>
            </Collapsible>

            {/* Level Filter */}
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium">
                     {t("level_title")}
                    <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3">
                    {levels.map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                                id={level}
                                checked={selectedLevels.includes(level)}
                                onCheckedChange={(checked) => handleLevelChange(level, checked as boolean)}
                                className="data-[state=checked]:border-[#46BEF2] data-[state=checked]:bg-[#46BEF2] data-[state=checked]:text-white dark:data-[state=checked]:border-[#46BEF2] dark:data-[state=checked]:bg-[#46BEF2]"
                            />
                            <label htmlFor={level} className="text-sm text-muted-foreground cursor-pointer">
                                {level}
                            </label>
                        </div>
                    ))}
                </CollapsibleContent>
            </Collapsible>
            <PriceRangeSlider />
            {/* Rating Filter */}
            <div>
                <h3 className="font-medium mb-3">{t("rating_title")}</h3>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        {/* <Checkbox id={`rating-${rating}`} /> */}
                        <label htmlFor={`rating-${5}`} className="flex items-center space-x-1 text-sm cursor-pointer">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </label>
                    </div>
                </div>
            </div>
        </div>
       </>
    )
}

export default FilterSidebar;

